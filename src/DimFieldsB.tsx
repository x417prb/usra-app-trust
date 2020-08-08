import React from "react";
import { ProjectValueName } from "./state/actions";
import ReadonlyUnitField from "./components/ReadonlyUnitField";
import ChoiceBox from "./components/ChoiceBox";
import { BatteryModules } from "./state/reducer";
import { Project, BatteryModuleData } from "./state/State";
import ModuleFields from "./components/ModuleFields";
import TextField from "./components/TextField";
import ReadonlyField from "./components/ReadonlyField";

const labels: Record<keyof BatteryModuleData, string> = {
  model: "Model",
  vendor: "Marque",
  Vnom: "Tension norminale",
  Cnom: "Capacite nominale",
  R: "Rendement"
};

export default function DimFieldsB({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {

  const Nc = project.Nc;
  const DODmax = project.DODmax;
  const Ƞout = project.Ƞout;

  const index = project.battery;
  const battery = index === -1 ? null : BatteryModules[index];

  const Cx = project.Cx;
  const Bsc = project.Bsc;
  const Bpc = project.Bpc;
  const Bt = project.Bt;

  return <>
    <TextField
      field="Nc"
      min={1} max={10}
      value={Nc}
      setValue={value => setValue("Nc", value)}
    />
    <TextField
      field="DODmax"
      min={0.01} max={1} step={0.01}
      value={DODmax}
      setValue={value => setValue("DODmax", value)}
    />
    <TextField
      field="Ƞout"
      min={0.01} max={1} step={0.01}
      value={Ƞout}
      setValue={value => setValue("Ƞout", value)}
    />
    <ReadonlyUnitField
      label="Capacite des batteries a installer"
      value={isFinite(Cx) ? Cx.toFixed(2) : "N/A"}
      unit="Ah"
    />
    <ChoiceBox
      label="Choix de battries"
      onChange={value => setValue("battery", value)}
      value={project.battery}
      items={BatteryModules.map(module => ({
        ...module,
        name: `${module.Vnom}V / ${module.Cnom} Ah ${module.vendor}`
      }))}
    />
    <ModuleFields
      labels={labels}
      module={battery ? {
        model: battery.model,
        vendor: battery.vendor,
        Vnom: `${battery.Vnom} V`,
        Cnom: `${battery.Cnom} Ah`,
        R: `${(battery.R * 100).toFixed(2)}%`,
      } : null}
    />
    <ReadonlyField
      label="Nombre des battries total"
      value={isFinite(Bt) ? Bt : "N/A"}
    />
    <ReadonlyField
      label="Nombre des battries en series"
      value={isFinite(Bsc) ? Bsc : "N/A"}
    />
    <ReadonlyField
      label="Nombre des battries en parallel"
      value={isFinite(Bpc) ? Bpc : "N/A"}
    />
  </>;

}
