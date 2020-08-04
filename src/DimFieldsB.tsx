import React from "react";
import { ProjectValueName } from "./state/actions";
import ReadonlyUnitField from "./components/ReadonlyUnitField";

function calculateCx(Nc: number, El: number, DODmax: number, Vsystem: number, Ƞout: number) {
  return (Nc * El * 1000) / (DODmax * Vsystem * Ƞout);
}

export default function DimFieldsB({
  Vsystem, El, setValue
}: {
  El: number;
  Vsystem: number;
  setValue(name: ProjectValueName, value: number): void;
}) {

  const Cx = calculateCx(0, El, 0, Vsystem, 0);

  return <>
    <ReadonlyUnitField
      label="Capacite des batteries a installer"
      value={isFinite(Cx) ? Cx.toFixed(2) : "N/A"}
      unit="Ah"
    />
  </>;

}
