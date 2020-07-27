import { ProjectNeed } from "./State";
import { List } from "immutable";

export type Action<T, K extends string> = { type: K; payload: T; };

type Actions = (
  CreateProject |
  EditProject   |
  DeleteProject |
  SetProjectNeeds
);

export type CreateProject = Action<{
  name: string;
  site: string;
}, "project:create">;

export type EditProject = Action<{
  id: number;
  name: string;
  site: string;
}, "project:edit">;

export type DeleteProject = Action<{
  id: number;
}, "project:delete">;

export type SetProjectNeeds = Action<{
  id: number;
  needs: List<ProjectNeed>;
}, "project.needs:set">;

export function setProjectNeeds(id: number, needs: List<ProjectNeed>): SetProjectNeeds {
  return { type: "project.needs:set", payload: { id, needs } };
}

export function createProject(name: string, site: string): CreateProject {
  return { type: "project:create", payload: { name, site } };
}

export function editProject(id: number, name: string, site: string): EditProject {
  return { type: "project:edit", payload: { id, name, site } };
}

export function deleteProject(id: number): DeleteProject {
  return { type: "project:delete", payload: { id } };
}

export default Actions;
