import React from "react";

import { ProjectValueName } from "../state/actions";
import { Project, ModelOnduleur } from "../state/State";
import ReadonlyUnitField from "../components/ReadonlyUnitField";
import ChoiceBox from "../components/ChoiceBox";
import { InverterModules as InverterModels } from "../state/reducer";
import ModuleFields from "../components/ModuleFields";
import { percentage, n } from "../utils/numbers";
import ReadonlyField from "../components/ReadonlyField";

const labels: Record<keyof ModelOnduleur, string> = {
  vendor: "Marque",
  Pnom: "Puissance nominale",
  PVmpp: "Plage de tension MPP",
  Vmax: "Tension maximal",
  Ƞ: "Rendement",
};

export default function DimOnduleur({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  const index = project.inverter;
  const inverter = index === -1 ? null : InverterModels[index];
  return <>
    <ReadonlyUnitField
      value={n(project.Pi, 2)} unit="Kw"
      label="Puissance d'onduleur"
    />
    <ReadonlyUnitField
      value={n(project.Vsystem, 2)} unit="V"
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
        Pnom: `${inverter.Pnom} KVA`,
        PVmpp: `de ${inverter.PVmpp.join(" a ")} V`,
        Vmax: `${inverter.Vmax} V`,
        Ƞ: `${percentage(inverter.Ƞ)}`,
      } : null}
    />
    <ReadonlyField
      value={n(project.nombreOnduleur)}
      label="Nombre d'onduleur"
    />
  </>;
}
