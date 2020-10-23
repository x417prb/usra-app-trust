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

export interface Project {
  id: number;
  name: string;
  site: string;

  needs: List<ProjectNeed>;
  energyBesoinTotal: number;
  Pf: number;

  module: number;
  battery: number;
  inverter: number;
  regulator: number;

  Htilt: number;
  Kloss: number;

  Ƞb: number;
  Pc: number;

  Vsystem: number;

  Mpc: number;
  Msc: number;
  Mt: number;

  Nc: number;
  DODmax: number;
  Ƞout: number;
  Cx: number;

  Bpc: number;
  Bsc: number;
  Bt: number;

  Pi: number;
  nombreOnduleur: number;

  Irated: number;

  Rc: number;

  Lmr: number;
  Vmr: number;
  Smr: number;
  Lbi: number;
  Ibi: number;
  Vbi: number;
  Sbi: number;
  Lic: number;
  Iic: number;
  Sic: number;
}

export default interface State {
  projects: List<Project>;
}

export interface ModelPV {
  name: string;
  Pm: number;
  Voc: number;
  Isc: number;
  Vmp: number;
  Imp: number;
  output: number;
  temperture: [number, number];
  type: string;
}

export interface ModelBattery {
  vendor: string;
  model: string;
  Vnom: number;
  Cnom: number;
  Ƞ: number;
}

export interface ModelOnduleur {
  vendor: string;
  Pnom: number;
  PVmpp: [number, number];
  Vmax: number;
  Ƞ: number;
}

export interface ModelRegulateur {
  name: string;
  Vout: number;
  I: number;
}
