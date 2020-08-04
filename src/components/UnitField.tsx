import React, { HTMLProps } from "react";

export default function UnitField({
  value, setValue, field, unit,
  ...props
}: HTMLProps<HTMLInputElement> & {
  unit: string;
  field: string | (() => JSX.Element);
  value: number | string;
  setValue(value: number): void;
}) {
  return <div className="mb-3 row">
    <label className="offset-sm-2 col-sm-3 col-form-label">{
      typeof field === "string" ? field : field()
    }:</label>
    <div className="col-sm-4">
      <div className="input-group mb-3">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.valueAsNumber)}
          className="form-control form-control-sm"
          {...props}
        />
        <span className="input-group-text">{unit}</span>
      </div>
    </div>
  </div>
}