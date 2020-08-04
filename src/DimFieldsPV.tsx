import React, { useState } from "react";
import { Project } from "./state/State";
import { modules } from "./state/reducer";
import { ProjectValueName } from "./state/actions";

export default function DimFieldsPV({
  project, setValue
}: {
  project: Project,
  setValue(name: ProjectValueName, value: number): void;
}) {

  const index = project.module;
  const module = index === -1 ? null : modules[index];

  const El = project.El;
  const Vsystem = project.Vsystem;
  const Htilt = project.Htilt;
  const Kloss = project.Kloss;
  const Ƞb = project.Ƞb;

  const Pc = project.Pc;

  const Msc = project.Msc;
  const Mpc = project.Mpc;
  const Mt = project.Mt;

  return <>
  <div className="mb-3 row">
    <label className="offset-sm-2 col-sm-3 col-form-label">Energy total:</label>
    <div className="col-sm-4">
      <div className="input-group">
        <input
          type="text"
          value={El.toFixed(2)} readOnly
          className="form-control form-control-sm"
        />
        <span className="input-group-text" title="KiloWatt par jour">Kwh/d</span>
      </div>
    </div>
  </div>
  <div className="mb-1 row">
    <label className="offset-sm-2 col-sm-3 col-form-label">H<sub>tilt</sub>:</label>
    <div className="col-sm-4">
      <input
        type="number" min={0}
        value={Htilt.toFixed(2)} onChange={e => setValue("Htilt", e.target.valueAsNumber)}
        className="form-control form-control-sm"
      />
    </div>
  </div>
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">K<sub>loss</sub>:</label>
      <div className="col-sm-4">
        <input
          type="number" min={0}
          value={Kloss.toFixed(2)} onChange={e => setValue("Kloss", e.target.valueAsNumber)}
          className="form-control form-control-sm"
        />
      </div>
    </div>
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Efficacite d'equilibre:</label>
      <div className="col-sm-4">
        <input
          type="number" min={0}
          value={Ƞb.toFixed(2)} onChange={e => setValue("Ƞb", e.target.valueAsNumber)}
          className="form-control form-control-sm"
        />
      </div>
    </div>
    <hr />
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Puissance à installer:</label>
      <div className="col-sm-4">
        <div className="input-group mb-3">
          <input
            type="text"
            value={isNaN(Pc) ? "N/A" : Pc.toFixed(2)} readOnly
            className="form-control form-control-sm" />
          <span className="input-group-text" title="KiloWatt">Kw</span>
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Choix de module:</label>
      <div className="col-sm-4">
        <select
          className="form-select form-select-sm"
          value={index}
          onChange={e => setValue("module", parseInt(e.target.value, 10))}>
          <option value={-1}>Selectionner un module</option>
          { modules.map((module, index) => {
            return <option key={index} value={index}>{module.name}</option>
          }) }
        </select>
      </div>
    </div>
    <div className="mb-3 row">
      <div className="offset-sm-2 col-sm-7">
        <div className="card text-white bg-secondary">
          <div className="card-body"> {
            module ? <>
              <div className="mb-2 row">
                <div className="col-sm-6">
                  <div className="d-flex">
                    <div className="flex-fill">Type:</div>
                    <div className="flex-fill">{module.type}</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex">
                    <div className="flex-fill">Puissance max:</div>
                    <div className="flex-fill">{module.Pm} Kw</div>
                  </div>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-sm-6">
                  <div className="d-flex">
                    <div className="flex-fill"><abbr title="Tension en circuit ouvert">V<sub>oc</sub></abbr>:</div>
                    <div className="flex-fill">{module.Voc} V</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex">
                    <div className="flex-fill"><abbr title="Courant de court-circuit">I<sub>sc</sub></abbr>:</div>
                    <div className="flex-fill">{module.Isc} A</div>
                  </div>
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-sm-6">
                  <div className="d-flex">
                    <div className="flex-fill"><abbr title="Tension de puissance max">V<sub>mp</sub></abbr>:</div>
                    <div className="flex-fill">{module.Vmp} V</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex">
                    <div className="flex-fill"><abbr title="Courant de puissance max">I<sub>mp</sub></abbr>:</div>
                    <div className="flex-fill">{module.Imp} A</div>
                  </div>
                </div>
              </div>
            </> : "Selectionner une module."
          } </div>
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">V<sub>système</sub>:</label>
      <div className="col-sm-4">
        <div className="input-group mb-3">
          <input
            type="number" min={0}
            value={Vsystem.toFixed(2)}
            onChange={e => setValue("Vsystem", e.target.valueAsNumber)}
            className="form-control form-control-sm" />
          <span className="input-group-text" title="Volt">V</span>
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Module en serie:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control form-control-sm" readOnly value={isFinite(Msc) ? Msc.toFixed(2) : "N/A"} />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Module en parallel:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control form-control-sm" readOnly value={isFinite(Mpc) ? Mpc.toFixed(2) : "N/A"} />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Nb totale de module:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control form-control-sm" readOnly value={isFinite(Mt) ? Mt.toFixed(2) : "N/A"} />
      </div>
    </div>
  </>;
};
