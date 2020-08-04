import React from "react";
import { Project } from "./state/State";
import { modules } from "./state/reducer";
import { ProjectValueName } from "./state/actions";

import ReadonlyUnitField from "./components/ReadonlyUnitField";
import ChoiceBox from "./components/ChoiceBox";
import ReadonlyField from "./components/ReadonlyField";
import UnitField from "./components/UnitField";
import TextField from "./components/TextField";
import ModuleFields from "./components/ModuleFields";

const labels = {
  type: "Type",
  Pm: "Puissance max",
  Voc: () => <abbr title="Tension en circuit ouvert">V<sub>oc</sub></abbr>,
  Isc: () => <abbr title="Courant de court-circuit">I<sub>sc</sub></abbr>,
  Vmp: () => <abbr title="Tension de puissance max">V<sub>mp</sub></abbr>,
  Imp: () => <abbr title="Courant de puissance max">I<sub>mp</sub></abbr>,
};

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
    <TextField
      field={() => <>H<sub>tilt</sub></>}
      value={Htilt.toFixed(2)}
      setValue={value => setValue("Htilt", value)}
    />
    <TextField
      field={() => <>K<sub>loss</sub></>}
      value={Kloss.toFixed(2)}
      setValue={value => setValue("Kloss", value)}
    />
    <TextField
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
    <ModuleFields
      module={module ? {
        type: module.type,
        Pm: `${module.Pm} Kw`,
        Voc: `${module.Voc} V`,
        Isc: `${module.Isc} A`,
        Vmp: `${module.Vmp} V`,
        Imp: `${module.Imp} A`,
      } : null}
      labels={labels}
    />
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
