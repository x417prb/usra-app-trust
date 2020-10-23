import React from "react";

export default function ReadonlyField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="mb-3 row">
      <label className="offset-sm-2 col-sm-4 col-form-label">{label}:</label>
      <div className="col-sm-4">
        <input
          type="text"
          className="form-control form-control-sm"
          readOnly
          value={value}
        />
      </div>
    </div>
  );
}
