import State, { Project } from './state/State';
import React, { useState } from 'react';

import {
  createProject,
  editProject,
  deleteProject
} from './state/actions';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

enum ProjectListState {
  Normal,
  EditProject,
  CreateProject
}

const ButtonText = [
  "Créer un nouveau projet",
  "Renommer",
  "Créer"
];

export default connect(
  (state: State, { current }: { current: number }) => {
    return {
      current,
      projects: state.projects
    };
  },
  {
    create: createProject,
    edit: editProject,
    remove: deleteProject
  }
)(function ProjectListView({
  current, projects,
  create, edit, remove
}: {
  current: number,
  projects: List<Project>,
  create: typeof createProject,
  edit: typeof editProject,
  remove: typeof deleteProject,
}) {

  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [state, setState] = useState(ProjectListState.Normal);
  const [projectID, setProjectID] = useState(-1);

  return <>
    <div className="list-group list-group-flush d-print-none mb-3">
      {
        projects.map(project => {
          return <Link
            to={`/${project.id}`}
            className={
              `list-group-item list-group-item-action ${
              state !== ProjectListState.Normal
                ? "disabled"
                : ""
              } ${
              current === project.id
                ? "active list-group-item-success"
                : ""
              }`
            }
            key={project.id}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>
                {project.name}
                <small className="font-weight-light" hidden={project.site === ""}> ({project.site})</small>
              </h5>
              <div className="btn-group btn-group-sm">
                <button
                  type="button"
                  className="btn"
                  hidden={state !== ProjectListState.Normal}
                  onClick={e => {
                    if (window.confirm("Voulez vous vraiment supprimer le projet ?")) {
                      e.stopPropagation();
                      remove(project.id);
                      requestAnimationFrame(() => {
                        setProjectID(current);
                      });
                    }
                  }}
                ><span role="img" aria-label="Supprimer">❌</span></button>
                <button
                  type="button"
                  className="btn"
                  hidden={state !== ProjectListState.Normal}
                  onClick={() => {
                    setProjectID(project.id);
                    setName(project.name);
                    setSite(project.site);
                    setState(ProjectListState.EditProject);
                  }}
                ><span role="img" aria-label="Ronommer">✏️</span></button>
              </div>
            </div>
          </Link>;
        })
      }
    </div>
    <form className="d-print-none">
      <div hidden={state === ProjectListState.Normal}>
        <div className="row">
          <label className="col-4 col-form-label">
            Nom de projet:
        </label>
          <div className="col-8">
            <input
              type="text" value={name}
              className="form-control form-control-sm"
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <label className="col-4 col-form-label">
            Site de projet:
        </label>
          <div className="col-8">
            <input
              type="text"
              value={site}
              className="form-control form-control-sm"
              onChange={e => setSite(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly mt-2">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          hidden={state === ProjectListState.Normal}
          onClick={() => {
            setState(ProjectListState.Normal);
          }}
        >Annuler</button>
        <button
          type="submit"
          className="btn btn-outline-success btn-sm"
          onClick={e => {
            e.preventDefault();
            switch (state) {
              case ProjectListState.Normal: {
                setName("");
                setSite("");
                setState(ProjectListState.CreateProject);
                return;
              }
              case ProjectListState.CreateProject: {
                create(name, site);
                setState(ProjectListState.Normal);
                return;
              }
              case ProjectListState.EditProject: {
                edit(projectID, name, site);
                setState(ProjectListState.Normal);
                return;
              }
            }
          }}
        >{ButtonText[state]}</button>
      </div>
    </form>
  </>;

});
