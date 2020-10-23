import React from "react";

import { ProjectValueName } from "../state/actions";
import { Project, ModelRegulateur } from "../state/State";
import ReadonlyUnitField from "../components/ReadonlyUnitField";
import ReadonlyField from "../components/ReadonlyField";
import ChoiceBox from "../components/ChoiceBox";
import { RegulatorModels } from "../state/reducer";
import ModuleFields from "../components/ModuleFields";
import { n } from "../utils/numbers";

const labels: Record<keyof ModelRegulateur, string> = {
  name: "Nom",
  I: "Courant",
  Vout: "Tension de parc batteries",
};

export default function DimFieldsR({
  project,
  setValue,
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  const index = project.regulator;
  const regulator = index === -1 ? null : RegulatorModels[index];
  const Rc = project.Rc;
  const Irated = project.Irated;
  return (
    <>
      <ReadonlyUnitField
        value={n(Irated, 2)}
        unit="A"
        label={() => (
          <>
            I<sub>rated</sub>
          </>
        )}
      />
      <ChoiceBox
        value={index}
        onChange={(value) => setValue("regulator", value)}
        items={RegulatorModels}
        label="Choix de regulateur"
      />
      <ModuleFields
        labels={labels}
        module={
          regulator
            ? {
                name: regulator.name,
                I: `${regulator.I} A`,
                Vout: `${regulator.Vout} V`,
              }
            : null
        }
      />
      <ReadonlyField value={n(Rc)} label="Nombre de regulateur" />
    </>
  );
}
