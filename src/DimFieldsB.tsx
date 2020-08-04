import React from "react";
import { ProjectValueName } from "./state/actions";

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
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-3 col-form-label">
        Capacite des batteries a installer:
      </label>
      <div className="col-sm-4">
        <div className="input-group">
          <input
            type="text"
            value={isFinite(Cx) ? Cx.toFixed(2) : "N/A"}
            readOnly
            className="form-control form-control-sm"
          />
          <span className="input-group-text">Ah</span>
        </div>
      </div>
    </div>
  </>;

}
