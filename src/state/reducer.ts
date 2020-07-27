import State, { Project, ProjectNeed, mutateCalcProjectNeed } from "./State";
import Actions from "./actions";
import { List } from "immutable";

type ProjectNeedJSON = ProjectNeed;

type ProjectJSON = Omit<State, 'projects'> & {
  needs: ProjectNeedJSON[];
}

type StateJSON = Omit<State, 'projects'> & {
  projects: ProjectJSON[]
};

const saved = localStorage.getItem("state");
const initial: State = saved ? decode(JSON.parse(saved)) : {
  projects: List([
    {
      id: 0,
      name: "Example",
      site: "Example site",
      needs: List<ProjectNeed>([{
        name: "Example",
        power: 1,
        hours: 1,
        quantity: 1,
        energy: 1,
        prolifiratedPower: 1,
        selected: false,
      }])
    },
  ])
};

let projectID = initial.projects.reduce((maximum, project) => {
  return Math.max(maximum, project.id + 1);
}, 0);

function reducer(state = initial, action: Actions): State {
  switch (action.type) {
    case "project.needs:set": {
      const { id, needs } = action.payload;
      const projet = state.projects.get(id)!;
      return {
        ...state,
        projects: state.projects.set(id, {
          ...projet,
          needs: needs.map(need => mutateCalcProjectNeed({ ...need }))
        } as Project)
      };
    }
    case "project:delete": {
      const { id } = action.payload;
      return {
        ...state,
        projects: state.projects.filter(project => {
          return project.id !== id;
        })
      };
    };
    case "project:edit": {
      const { id, name, site } = action.payload;
      return {
        ...state,
        projects: state.projects.set(id, {
          ...state.projects.get(id),
          id, name, site
        } as Project)
      };
    };
    case "project:create": {
      const { name, site } = action.payload;
      return {
        ...state,
        projects: state.projects.push({
          id: projectID++,
          name, site,
          needs: List()
        })
      };
    };
    default: return state;
  }
}

function encode(state: State): StateJSON {
  return {
    projects: state.projects.map(project => ({
      ...project,
      needs: project.needs.toArray()
    } as ProjectJSON)).toArray()
  };
}

function decode(state: StateJSON): State {
  return {
    projects: List(state.projects.map(project => ({
      ...project,
      needs: List(project.needs)
    }))) as List<Project>
  };
}

export default function (state = initial, action: Actions) {
  const next = reducer(state, action);
  localStorage.setItem("state", JSON.stringify(encode(next)));
  return next;
};
