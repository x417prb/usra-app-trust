import React from "react";
import { ProjectValueName } from "../state/actions";
import ReadonlyUnitField from "../components/ReadonlyUnitField";
import ChoiceBox from "../components/ChoiceBox";
import { BatteryModules } from "../state/reducer";
import { Project, ModelBattery } from "../state/State";
import ModuleFields from "../components/ModuleFields";
import NumberField from "../components/NumberField";
import ReadonlyField from "../components/ReadonlyField";
import { n, percentage } from "../utils/numbers";

const labels: Record<keyof ModelBattery, string> = {
  model: "Model",
  vendor: "Marque",
  Vnom: "Tension norminale",
  Cnom: "Capacite nominale",
  Ƞ: "Rendement",
};

export default function DimBatteries({
  project,
  setValue,
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  const Nc = project.Nc;
  const DODmax = project.DODmax;
  const Ƞout = project.Ƞout;

  const index = project.battery;
  const battery = index === -1 ? null : BatteryModules[index];

  const Cx = n(project.Cx, 2);
  const Bsc = project.Bsc;
  const Bpc = project.Bpc;
  const Bt = project.Bt;

  return (
    <>
      <NumberField
        field="Nc"
        min={1}
        max={10}
        value={Nc}
        setValue={(value) => setValue("Nc", value)}
      />
      <NumberField
        field="DODmax"
        min={0.01}
        max={1}
        step={0.01}
        value={DODmax}
        setValue={(value) => setValue("DODmax", value)}
      />
      <NumberField
        field="Ƞout"
        min={0.01}
        max={1}
        step={0.01}
        value={Ƞout}
        setValue={(value) => setValue("Ƞout", value)}
      />
      <ReadonlyUnitField
        label="Capacite des batteries a installer"
        value={Cx}
        unit="Ah"
      />
      <ChoiceBox
        label="Choix de battries"
        onChange={(value) => setValue("battery", value)}
        value={project.battery}
        items={BatteryModules.map((module) => ({
          ...module,
          name: `${module.Vnom}V / ${module.Cnom} Ah ${module.vendor}`,
        }))}
      />
      <ModuleFields
        labels={labels}
        module={
          battery
            ? {
                model: battery.model,
                vendor: battery.vendor,
                Vnom: `${battery.Vnom} V`,
                Cnom: `${battery.Cnom} Ah`,
                Ƞ: `${percentage(battery.Ƞ)}`,
              }
            : null
        }
      />
      <ReadonlyField label="Nombre des battries total" value={n(Bt)} />
      <ReadonlyField label="Nombre des battries en series" value={n(Bsc)} />
      <ReadonlyField label="Nombre des battries en parallel" value={n(Bpc)} />
    </>
  );
}
