import React from "react";
import { ProjectValueName } from "./state/actions";
import ReadonlyUnitField from "./components/ReadonlyUnitField";
import ChoiceBox from "./components/ChoiceBox";
import { BatteryModules } from "./state/reducer";
import { Project } from "./state/State";

export default function DimFieldsB({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {

  const Cx = project.Cx;

  return <>
    <ChoiceBox
      label="Choix de battries"
      onChange={value => setValue("battery", value)}
      value={project.battery}
      items={BatteryModules.map(module => ({
        ...module,
        name: `${module.Vnom}V / ${module.Cnom} Ah ${module.vendor}`
      }))}
    />
    <ReadonlyUnitField
      label="Capacite des batteries a installer"
      value={isFinite(Cx) ? Cx.toFixed(2) : "N/A"}
      unit="Ah"
    />
  </>;

}
