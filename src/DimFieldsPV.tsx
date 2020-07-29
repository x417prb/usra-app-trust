import React, { useState } from "react";
import { modules, ProjectNeed } from "./state/State";
import { List } from "immutable";

function reduceProjectNeedsTotalPower(total: number, need: ProjectNeed) {
  // TODO: this is wrong, so much more calculations need to be done.
  return total + need.prolifiratedPower;
}

export default function DimFieldsPV({ needs }: { needs: List<ProjectNeed> }) {

  const [moduleIndex, setModuleIndex] = useState(-1);
  const [Vsys, setVsys] = useState(0);
  const Pti = needs.reduce(reduceProjectNeedsTotalPower, 0);

  const module = moduleIndex === -1 ? null : modules[moduleIndex];

  const nMS = module ? Math.ceil(Vsys / module.Vmp) : NaN;
  const nMP = module && nMS !== 0 ? Math.ceil(Pti / (nMS * module.Pm)) : NaN;
  const nTotal = nMP * nMS;

  return <>
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Orientation oprimal:</label>
      <div className="col-sm-4">
        <input type="number" min="0" max="360" defaultValue="0" className="form-control form-control-sm" />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Inclinaison oprimal:</label>
      <div className="col-sm-4">
        <input type="number" min="0" max="90" defaultValue="0" className="form-control form-control-sm" />
      </div>
    </div>
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Puissance à installer:</label>
      <div className="col-sm-4">
        <div className="input-group mb-3">
          <input
            type="number"
            value={Pti} readOnly
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
          value={moduleIndex}
          onChange={e => setModuleIndex(parseInt(e.target.value, 10))}>
          <option value={-1}>Selectionner une module</option>
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
            value={Vsys} onChange={e => setVsys(e.target.valueAsNumber)}
            className="form-control form-control-sm" />
          <span className="input-group-text" title="Volt">V</span>
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Module en serie:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control-plaintext form-control-sm" readOnly value={isFinite(nMS) ? nMS : "N/A"} />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Module en parallel:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control-plaintext form-control-sm" readOnly value={isFinite(nMP) ? nMP : "N/A"} />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">Nb totale de module:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control-plaintext form-control-sm" readOnly value={isFinite(nTotal) ? nTotal : "N/A"} />
      </div>
    </div>
  </>;
};
