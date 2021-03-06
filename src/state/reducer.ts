import State, {
  Project,
  ProjectNeed,
  ModelPV,
  ModelBattery,
  ModelOnduleur,
  ModelRegulateur,
} from "./State";
import Actions from "./actions";
import { List } from "immutable";
import { validate } from "../utils/numbers";

type ProjectNeedJSON = ProjectNeed;

type ProjectJSON = Omit<State, "projects"> & {
  needs: ProjectNeedJSON[];
};

type StateJSON = Omit<State, "projects"> & {
  projects: ProjectJSON[];
};

const saved = localStorage.getItem("state");
const initial: State = saved
  ? decode(JSON.parse(saved))
  : {
      projects: List(),
    };

export function mutateCalcProjectNeed(n: ProjectNeed) {
  n.energy = n.hours * ((n.prolifiratedPower = n.quantity * n.power) / 1000);
  return n;
}

function reduceProjectNeedsTotalEnergy(total: number, need: ProjectNeed) {
  return total + need.energy;
}

function reduceProjectNeedsProlifiratedPower(total: number, need: ProjectNeed) {
  return total + need.prolifiratedPower;
}

function calculateTotalEnergy(needs: List<ProjectNeed>) {
  return needs.reduce(reduceProjectNeedsTotalEnergy, 0);
}

function calculateProlifiratedPower(needs: List<ProjectNeed>) {
  return needs.reduce(reduceProjectNeedsProlifiratedPower, 0);
}

let projectID = initial.projects.reduce((maximum, project) => {
  return Math.max(maximum, project.id + 1);
}, 0);

const PSI = 1;

function calculatePc(El: number, Ƞb: number, Kloss: number, Htilt: number) {
  return (El / (Ƞb * Kloss * Htilt)) * PSI;
}

function calculateCx(
  Nc: number,
  El: number,
  DODmax: number,
  Vsystem: number,
  Ƞout: number
) {
  return (Nc * 1000 * El) / (DODmax * Vsystem * Ƞout);
}

const batteries = localStorage.getItem("batteries");
export const BatteryModules: ModelBattery[] = batteries
  ? JSON.parse(batteries)
  : [
      {
        model: "12MD325P",
        vendor: "Rolls",
        Vnom: 12,
        Cnom: 325,
        Ƞ: 0.98,
      },
      {
        model: "Solar 12V / 160 Ah",
        vendor: "Generic",
        Vnom: 12,
        Cnom: 160,
        Ƞ: 0.98,
      },
      {
        model: "12-CS-11PS",
        vendor: "Rolls",
        Vnom: 12,
        Cnom: 296,
        Ƞ: 0.98,
      },
    ];

const pv = localStorage.getItem("pv");
export const PVModules: ModelPV[] = pv
  ? JSON.parse(pv)
  : [
      {
        name: "ENP Sonne 180Wc",
        type: "Polycristalline",
        Voc: 38.2,
        Vmp: 24,
        Pm: 180,
        Isc: 5.38,
        Imp: 5.2,
        output: 0.1598,
        temperture: [-40, +85],
      },
      {
        name: "SUNTECH 280Wc",
        Pm: 260,
        Voc: 38.2,
        Isc: 8.9,
        Vmp: 30.7,
        Imp: 8.47,
        output: 0.1598,
        temperture: [-40, +85],
        type: "Polycristalline",
      },
      {
        name: "TESLA POWER",
        Pm: 280,
        Voc: 38.2,
        Isc: 9.38,
        Vmp: 31.6,
        Imp: 8.86,
        output: 0.171,
        temperture: [-40, +85],
        type: "Polycristalline",
      },
    ];

const inverters = localStorage.getItem("inverters");
export const InverterModules: ModelOnduleur[] = inverters
  ? JSON.parse(inverters)
  : [
      {
        vendor: "15Kva Offgrid Solo",
        Pnom: 15,
        PVmpp: [120, 440],
        Vmax: 550,
        Ƞ: 0.97,
      },
      {
        vendor: "Generic",
        Pnom: 3,
        PVmpp: [125, 440],
        Vmax: 550,
        Ƞ: 0.97,
      },
    ];

const regulators = localStorage.getItem("regulators");
export const RegulatorModules: ModelRegulateur[] = regulators
  ? JSON.parse(regulators)
  : [
      {
        name: "Xantex - 60A - 12V/24V",
        I: 60,
        Vout: 24,
      },
    ];

// Ω

export const ρ = 1.724e-8;

function calcS(I: number, L: number, Vd: number) {
  return 2e6 * ((ρ * I * L) / Vd);
}

function calcVd(V: number) {
  return 0.04 * V;
}

function calcVdmr(Voc: number, Msc: number) {
  return calcVd(Voc * Msc * 1.15);
}

function calcIbi(Pi: number, Ƞ: number, Vsystem: number) {
  return (1000 * Pi) / (Ƞ * Vsystem);
}

const SQRT3 = Math.sqrt(3);
const VLOAD = 220;

function calcIic(Pi: number) {
  return (1000 * Pi) / (VLOAD * SQRT3);
}

export const Vic = calcVd(VLOAD);

initial.projects = initial.projects.map((project) => {
  return mutateUpdateProject(project);
});

function mutateUpdateProject(project: Project) {
  const Vsystem = project.Vsystem;

  const Pc = (project.Pc = calculatePc(
    project.energyBesoinTotal,
    project.Ƞb,
    project.Kloss,
    project.Htilt
  ));

  const PV = PVModules[project.module];

  const Isc = validate(PV?.Isc);

  const Msc = (project.Msc = Math.ceil(Vsystem / validate(PV?.Vmp)));
  const Mpc = (project.Mpc = Math.ceil((1000 * Pc) / (Msc * validate(PV?.Pm))));

  project.Mt = Mpc * Msc;

  const Nc = project.Nc;
  const DODmax = project.DODmax;
  const Ƞout = project.Ƞout;

  const battery = BatteryModules[project.battery];
  const inverter = InverterModules[project.inverter];

  const Cx = (project.Cx = calculateCx(
    Nc,
    project.energyBesoinTotal,
    DODmax,
    Vsystem,
    Ƞout
  ));

  const Bt = (project.Bt = Math.ceil(Cx / validate(battery?.Cnom)));
  const Bsc = (project.Bsc = Math.ceil(Vsystem / validate(battery?.Vnom)));
  project.Bpc = Math.floor(Bt / Bsc);

  project.Pi = (project.Pf * 1.25) / 1000;
  project.nombreOnduleur = Math.max(
    1,
    Math.round(project.Pi / validate(inverter?.Pnom))
  );

  const Irated = (project.Irated = Isc * Mpc * 1.25);

  const regulateur = RegulatorModules[project.regulator];

  project.Rc = Math.ceil(Irated / validate(regulateur?.I));

  const Voc = validate(PV?.Voc);
  const Ƞbatterie = validate(battery?.Ƞ);
  const Pi = validate(inverter?.Pnom);

  const Lmr = project.Lmr;
  const Lbi = project.Lbi;
  const Lic = project.Lic;

  const Vdmr = (project.Vmr = calcVdmr(Voc, Msc));
  project.Smr = calcS(Irated, Lmr, Vdmr);
  const Ibi = (project.Ibi = calcIbi(Pi, Ƞbatterie, Vsystem));
  const Vbi = (project.Vbi = calcVd(Vsystem));
  project.Sbi = calcS(Ibi, Lbi, Vbi);
  const Iic = (project.Iic = calcIic(Pi));
  project.Sic = calcS(Iic, Lic, Vic);

  return project;
}

function reducer(state = initial, action: Actions): State {
  switch (action.type) {
    case "project:set": {
      const { id, name, value } = action.payload;

      const project = {
        ...state.projects.get(id)!,
        [name]: value,
      } as Project;

      return {
        ...state,
        projects: state.projects.set(id, mutateUpdateProject(project)),
      };
    }
    case "project.needs:set": {
      const { id, needs } = action.payload;
      const projet = state.projects.get(id)!;
      const $needs = needs.map((need) => mutateCalcProjectNeed({ ...need }));
      return {
        ...state,
        projects: state.projects.set(
          id,
          mutateUpdateProject({
            ...projet,
            needs: $needs,
            energyBesoinTotal: calculateTotalEnergy($needs),
            Pf: calculateProlifiratedPower($needs),
          } as Project)
        ),
      };
    }
    case "project:delete": {
      const { id } = action.payload;
      return {
        ...state,
        projects: state.projects.filter((project) => {
          return project.id !== id;
        }),
      };
    }
    case "project:edit": {
      const { id, name, site } = action.payload;
      return {
        ...state,
        projects: state.projects.set(id, {
          ...state.projects.get(id),
          id,
          name,
          site,
        } as Project),
      };
    }
    case "project:create": {
      const { name, site } = action.payload;
      return {
        ...state,
        projects: state.projects.push({
          id: projectID++,
          name,
          site,
          needs: List(),
          energyBesoinTotal: 0,
          Pf: 0,
          Htilt: 0,
          Kloss: 0,
          Mpc: 0,
          Msc: 0,
          Mt: 0,
          Pc: 0,
          Vsystem: 0,
          module: -1,
          battery: -1,
          inverter: -1,
          regulator: -1,
          Ƞb: 0,
          Nc: 1,
          DODmax: 0.01,
          Ƞout: 0.01,
          Cx: 0,
          Bpc: 0,
          Bsc: 0,
          Bt: 0,
          Pi: 0,
          nombreOnduleur: NaN,
          Irated: 0,
          Rc: 0,
          Lmr: 0,
          Vmr: NaN,
          Smr: NaN,
          Lbi: 0,
          Ibi: NaN,
          Vbi: NaN,
          Sbi: NaN,
          Lic: 0,
          Iic: NaN,
          Sic: NaN,
        }),
      };
    }
    default:
      return state;
  }
}

function encode(state: State): StateJSON {
  return {
    projects: state.projects
      .map(
        (project) =>
          ({
            ...project,
            needs: project.needs.toArray(),
          } as ProjectJSON)
      )
      .toArray(),
  };
}

function decode(state: StateJSON): State {
  return {
    projects: List(
      state.projects.map((project) => ({
        ...project,
        needs: List(project.needs),
      }))
    ) as List<Project>,
  };
}

export default function (state = initial, action: Actions) {
  const next = reducer(state, action);
  localStorage.setItem("state", JSON.stringify(encode(next)));
  return next;
}
