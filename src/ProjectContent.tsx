import React from "react";
import ProjectNeedsTable from "./ProjectNeedsTable";

import State, { Project } from "./state/State";

import { connect } from "react-redux";
import { setProjectNeeds, setProjectValue } from "./state/actions";

import DimFieldsPV from "./DimFieldsPV";
import DimFieldsB from "./DimFieldsB";

export default connect((state: State, { current }: { current: number }) => {
  return {
    current, project: state.projects.find(project => {
      return project.id === current;
    })
  };
}, {
  setNeeds: setProjectNeeds,
  setValue: setProjectValue
})(function ProjectContent({
  project,
  setNeeds,
  setValue
}: {
  project?: Project;
  setNeeds: typeof setProjectNeeds;
  setValue: typeof setProjectValue;
}) {
  return project ? <>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" data-toggle="tab" href="#needs">Besoins</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#dim-pv">Dimensionement PV</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#dim-bat">Dimensionement Batteries</a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane py-4 fade show active" id="needs">
        <ProjectNeedsTable
          current={project.id}
          needs={project.needs}
          setNeeds={setNeeds}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-pv">
        <DimFieldsPV
          project={project}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-bat">
        <DimFieldsB
          Vsystem={project.Vsystem}
          El={project.El}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
    </div>
  </> : <>
    <div className="card">
      <div className="card-body text-center text-muted">
        Selectionner un projet de la liste.
      </div>
    </div>
  </>;
});
