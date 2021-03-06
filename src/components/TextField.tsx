import React, { HTMLProps } from "react";

export default function TextField({
  value,
  setValue,
  field,
  ...props
}: HTMLProps<HTMLInputElement> & {
  field: string | (() => JSX.Element);
  value: number | string;
  setValue(value: string): void;
}) {
  return (
    <div className="mb-1 row">
      <label className="offset-sm-2 col-sm-4 col-form-label">
        {typeof field === "string" ? field : field()}:
      </label>
      <div className="col-sm-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-control form-control-sm"
          {...props}
        />
      </div>
    </div>
  );
}
