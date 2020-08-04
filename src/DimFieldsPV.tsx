import React from "react";
import { Project } from "./state/State";
import { modules } from "./state/reducer";
import { ProjectValueName } from "./state/actions";

import ReadonlyUnitField from "./components/ReadonlyUnitField";
import ChoiceBox from "./components/ChoiceBox";
import ReadonlyField from "./components/ReadonlyField";
import UnitField from "./components/UnitField";
import NumberField from "./components/NumberField";

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
  const Mtc = project.Mt;

  return <>
    <ReadonlyUnitField
      label="Energy total"
      value={El.toFixed(2)}
      unit="Kwh/d"
    />
    <NumberField
      field={() => <>H<sub>tilt</sub></>}
      value={Htilt.toFixed(2)}
      setValue={value => setValue("Htilt", value)}
    />
    <NumberField
      field={() => <>K<sub>loss</sub></>}
      value={Kloss.toFixed(2)}
      setValue={value => setValue("Kloss", value)}
    />
    <NumberField
      field="Efficacite d'equilibre"
      value={Ƞb.toFixed(2)}
      setValue={value => setValue("Ƞb", value)}
    />
    <hr />
    <ReadonlyUnitField
      label="Puissance à installer"
      value={isFinite(Pc) ? Pc.toFixed(2) : "N/A"}
      unit="Kw"
    />
    <ChoiceBox
      label="Choix de module"
      items={modules}
      value={index}
      onChange={value => setValue("module", value)}
    />
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
    <UnitField
      value={Vsystem.toFixed(2)} unit="V"
      field={() => <>V<sub>système</sub></>}
      setValue={value => setValue("Vsystem", value)}
    />
    <ReadonlyField
      label="Modules en parallel"
      value={isFinite(Mpc) ? Mpc.toFixed(2) : "N/A"}
    />
    <ReadonlyField
      label="Modules en serie"
      value={isFinite(Msc) ? Msc.toFixed(2) : "N/A"}
    />
    <ReadonlyField
      label="Nombre de modules total"
      value={isFinite(Mtc) ? Mtc.toFixed(2) : "N/A"}
    />
  </>;
};
