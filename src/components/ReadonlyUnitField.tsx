import React from "react";

export default function ReadonlyUnitField({
  label, value, unit
}: {
  unit: string;
  label: string | (() => JSX.Element);
  value: string | number;
}) {
  return <div className="mb-3 row">
    <label className="offset-sm-2 col-sm-3 col-form-label">{
      typeof label === "string" ? label : label()
    }:</label>
    <div className="col-sm-4">
      <div className="input-group">
        <input
          type="text"
          value={value} readOnly
          className="form-control form-control-sm"
        />
        <span className="input-group-text">{unit}</span>
      </div>
    </div>
  </div>;
}
