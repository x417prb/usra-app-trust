import React from "react";

import State, { Project } from "./state/State";

import { connect } from "react-redux";
import { setProjectNeeds, setProjectValue } from "./state/actions";

import Besoins from "./Besoins";
import PV from "./dimentionement/PV";
import DimBatteries from "./dimentionement/Battries";
import DimOnduleur from "./dimentionement/Onduleur";
import DimFieldsR from "./dimentionement/Regulateur";
import Cables from "./dimentionement/Cables";
import Report from "./Report";

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
    <ul className="nav nav-tabs d-print-none">
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success active" data-toggle="tab" href="#needs">Besoins</a>
      </li>
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success" data-toggle="tab" href="#dim-pv">Dim. PV</a>
      </li>
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success" data-toggle="tab" href="#dim-bat">Dim. Batteries</a>
      </li>
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success" data-toggle="tab" href="#dim-ond">Dim. Onduleur</a>
      </li>
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success" data-toggle="tab" href="#dim-reg">Dim. Regulateurs</a>
      </li>
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success" data-toggle="tab" href="#dim-cab">Dim. Cables</a>
      </li>
      <li className="nav-item flex-sm-fill">
        <a className="nav-link link-success" data-toggle="tab" href="#dim-rep">Rapport</a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane py-4 fade show active" id="needs">
        <Besoins
          current={project.id}
          needs={project.needs}
          setNeeds={setNeeds}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-pv">
        <PV
          project={project}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-bat">
        <DimBatteries
          project={project}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-ond">
        <DimOnduleur
          project={project}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-reg">
        <DimFieldsR
          project={project}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-cab">
        <Cables
          project={project}
          setValue={(name, value) => setValue(project.id, name, value)}
        />
      </div>
      <div className="tab-pane py-4 fade" id="dim-rep">
        <Report
          project={project}
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
