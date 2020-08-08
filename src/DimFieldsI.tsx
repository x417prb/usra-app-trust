import React from "react";

import { ProjectValueName } from "./state/actions";
import { Project, InverterModuleData } from "./state/State";

const labels: Record<keyof InverterModuleData, string> = {
};

export default function DimFieldsI({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  return <></>;
}
