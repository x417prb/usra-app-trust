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

export default function PV({
  project, setValue
}: {
  project: Project,
  setValue(name: ProjectValueName, value: number): void;
}) {

  const PV = PVModels[project.module];

  return <>
    <ReadonlyUnitField
      label="Energy total"
      value={n(project.energyBesoinTotal, 2)}
      unit="Kwh/j"
    />
    <TextField
      field={() => <>H<sub>tilt</sub></>}
      value={n(project.Htilt)}
      min={0} step={0.01}
      setValue={value => setValue("Htilt", value)}
    />
    <TextField
      field={() => <>K<sub>loss</sub></>}
      value={n(project.Kloss)}
      min={0} step={0.01}
      setValue={value => setValue("Kloss", value)}
    />
    <TextField
      field="Efficacite d'equilibre"
      value={n(project.Ƞb)}
      min={0} step={0.01}
      setValue={value => setValue("Ƞb", value)}
    />
    <hr />
    <ReadonlyUnitField
      label="Puissance à installer"
      value={n(project.Pc, 2)}
      unit="Kw"
    />
    <ChoiceBox
      label="Choix de module"
      items={PVModels}
      value={project.module}
      onChange={value => setValue("module", value)}
    />
    <ModuleFields
      module={PV ? {
        type: PV.type,
        Pm: `${PV.Pm} Wc`,
        Voc: `${PV.Voc} V`,
        Isc: `${PV.Isc} A`,
        Vmp: `${PV.Vmp} V`,
        Imp: `${PV.Imp} A`,
      } : null}
      labels={labels}
    />
    <UnitField
      value={n(project.Vsystem)} unit="V"
      min={0} max={48} step={12}
      field="Tension du system"
      setValue={value => setValue("Vsystem", value)}
    />
    <ReadonlyField
      label="Modules en serie"
      value={n(project.Msc)}
    />
    <ReadonlyField
      label="Modules en parallel"
      value={n(project.Mpc)}
    />
    <ReadonlyField
      label="Nombre de modules total"
      value={n(project.Mt)}
    />
  </>;
};
