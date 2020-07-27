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
}

export default interface State {
  projects: List<Project>;
};
