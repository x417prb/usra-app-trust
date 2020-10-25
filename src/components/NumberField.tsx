import React, { HTMLProps } from "react";

export default function NumberField({
  value,
  setValue,
  field,
  ...props
}: HTMLProps<HTMLInputElement> & {
  field: string | (() => JSX.Element);
  value: number | string;
  setValue(value: number): void;
}) {
  return (
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-4 col-form-label">
        {typeof field === "string" ? field : field()}:
      </label>
      <div className="col-sm-4">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          className="form-control form-control-sm"
          {...props}
        />
      </div>
    </div>
  );
}
