import React from "react";

import { ProjectValueName } from "./state/actions";
import { Project, InverterModuleData } from "./state/State";
import ReadonlyUnitField from "./components/ReadonlyUnitField";
import ChoiceBox from "./components/ChoiceBox";
import { InverterModules as InverterModels } from "./state/reducer";
import ModuleFields from "./components/ModuleFields";

const labels: Record<keyof InverterModuleData, string> = {
  vendor: "Marque",
  Pnom: "Puissance nominale",
  PVmpp: "Plage de tension MPP",
  Vmax: "Tension maximal",
  Ƞ: "Rendement",
};

export default function DimFieldsI({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  const index = project.inverter;
  const inverter = index === -1 ? null : InverterModels[index];
  return <>
    <ReadonlyUnitField
      value={project.Pi} unit="Kw"
      label="Puissance d'onduleur"
    />
    <ReadonlyUnitField
      value={project.Vsystem} unit="V"
      label="Tension d'onduleur"
    />
    <ChoiceBox
      value={index}
      onChange={value => setValue("inverter", value)}
      items={InverterModels.map(model => ({
        ...model,
        name: `${model.vendor} - ${model.Pnom} Kw - Inverter`
      }))}
      label="Choix d'onduleur"
    />
    <ModuleFields
      labels={labels}
      module={inverter ? {
        vendor: inverter.vendor,
        Pnom: `${inverter.Pnom} Kw`,
        PVmpp: `de ${inverter.PVmpp.join(" a ")} V`,
        Vmax: `${inverter.Vmax} V`,
        Ƞ: `${(inverter.Ƞ * 100).toFixed(2)}%`,
      } : null}
    />
  </>;
}
