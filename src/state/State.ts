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
  El: number;
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
  Irated: number;

  Rc: number;

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
  temperture: [number, number];
  type: string;
}

export interface BatteryModuleData {
  vendor: string;
  model: string;
  Vnom: number;
  Cnom: number;
  Ƞ: number;
}

export interface InverterModuleData {
  vendor: string;
  Pnom: number;
  PVmpp: [number, number];
  Vmax: number;
  Ƞ: number;
}

export interface RegulatorModelData {
  name: string;
  Vout: number;
  I: number;
}
