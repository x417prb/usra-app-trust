import React from "react";
import ProjectNeedsTable from "./ProjectNeedsTable";

import State, { Project } from "./state/State";

import { connect } from "react-redux";
import { setProjectNeeds } from "./state/actions";

export default connect((state: State, { current }: { current: number }) => {
  return {
    current, project: state.projects.find(project => {
      return project.id === current;
    })
  };
}, {
  setNeeds: setProjectNeeds,
})(function ProjectContent({
  project,
  setNeeds,
}: {
  project?: Project;
  setNeeds: typeof setProjectNeeds;
}) {
  return project ? <>
    <ProjectNeedsTable
      current={project.id}
      needs={project.needs}
      setNeeds={setNeeds}
    />
  </> : <>
    <div className="card">
      <div className="card-body text-center text-muted">
        Selectionner un projet de la liste.
      </div>
    </div>
  </>;
});
