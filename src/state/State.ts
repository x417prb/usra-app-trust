import { List } from "immutable";

export interface ProjectNeed {
  name: string;
  hours: number;
  quantity: number;
  power: number;
  prolifiratedPower: number;
  energy: number;
  selected: boolean;
}

export function mutateCalcProjectNeed(n: ProjectNeed) {
  n.energy = n.hours * (n.prolifiratedPower = n.quantity * n.power);
  return n;
}

export interface Project {
  id: number;
  name: string;
  site: string;

  needs: List<ProjectNeed>;
  El: number;

  Htilt: number;
  Kloss: number;

  Ƞb: number;
  Pc: number;
  module: number;

  Vsystem: number;

  Mpc: number;
  Msc: number;
  Mt: number;

}

export default interface State {
  projects: List<Project>;
};

export interface PVModuleData {
  name: string;
  Pm: number;
  Voc: number;
  Isc: number;
  Vmp: number;
  Imp: number;
  output: number;
  temperture: number[];
  type: string;
}

export const modules: PVModuleData[] = [{
  name: "SUNTECH 280Wc",
  Pm: 260,
  Voc: 38.2,
  Isc: 8.90,
  Vmp: 30.7,
  Imp: 8.47,
  output: 0.1598,
  temperture: [-40, +85],
  type: "Polycristalline"
}, {
  name: "TESLA POWER",
  Pm: 280,
  Voc: 38.2,
  Isc: 9.38,
  Vmp: 31.6,
  Imp: 8.86,
  output: 0.1710,
  temperture: [-40, +85],
  type: "Polycristalline"
}];
