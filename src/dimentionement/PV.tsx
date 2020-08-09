import React from "react";
import { Project } from "../state/State";
import { PVModels } from "../state/reducer";
import { ProjectValueName } from "../state/actions";

import ReadonlyUnitField from "../components/ReadonlyUnitField";
import ChoiceBox from "../components/ChoiceBox";
import ReadonlyField from "../components/ReadonlyField";
import UnitField from "../components/UnitField";
import TextField from "../components/TextField";
import ModuleFields from "../components/ModuleFields";
import { n } from "../utils/numbers";

const labels = {
  type: "Type",
  Pm: "Puissance max",
  Voc: "Tension en circuit ouvert",
  Isc: "Courant de court-circuit",
  Vmp: "Tension de puissance max",
  Imp: "Courant de puissance max",
};

export default function DimPV({
  project, setValue
}: {
  project: Project,
  setValue(name: ProjectValueName, value: number): void;
}) {

  const index = project.module;
  const module = index === -1 ? null : PVModels[index];

  const El = project.El;
  const Vsystem = project.Vsystem;
  const Htilt = project.Htilt;
  const Kloss = project.Kloss;
  const Ƞb = project.Ƞb;

  const Pc = n(project.Pc, 2);

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
      value={Pc}
      unit="Kw"
    />
    <ChoiceBox
      label="Choix de module"
      items={PVModels}
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
      value={Vsystem} unit="V"
      min={0} max={48} step={12}
      field="Tension du system"
      setValue={value => setValue("Vsystem", value)}
    />
    <ReadonlyField
      label="Modules en serie"
      value={n(Msc, 2)}
    />
    <ReadonlyField
      label="Modules en parallel"
      value={n(Mpc, 2)}
    />
    <ReadonlyField
      label="Nombre de modules total"
      value={n(Mtc, 2)}
    />
  </>;
};
