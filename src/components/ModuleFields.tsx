import React from "react";

type Label = {
  (): JSX.Element;
} | string;

type Field = {
  name: string;
  label: Label;
};

function renderLabel(label: Label) {
  return typeof label === "string" ? label : label();
}

const rowsCache = new WeakMap<Record<string, Label>, [Field, Field][]>();

function getRows(labels: Record<string, Label>) {
  if (rowsCache.has(labels))
    return rowsCache.get(labels)!;
  const names = Object.keys(labels);
  const values = Object.values(labels);
  const rows: [Field, Field][] = [];
  const count = names.length;
  // alert(count);
  for (let i = 0; i < count; i += 2) {
    const row: Field[] = [];
    row.push({
      name: names[i],
      label: values[i]
    });
    if (i !== count - 1) {
      row.push({
        name: names[i + 1],
        label: values[i + 1]
      });
    }
    rows.push(row as any);
  }
  rowsCache.set(labels, rows);
  return rows;
}

function ModuleRecord({
  module, rows
}: {
  module: Record<string, number | string>,
  rows: [Field, Field][]
}) {
  return <>{
    rows.map(([first, second], index) => {
      return <div className="mb-2 row" key={index}>
        <div className="col-sm-6">
          <div className="d-flex">
            <div className="flex-fill">{renderLabel(first.label)}:</div>
            <div className="flex-fill text-right">{module[first.name]}</div>
          </div>
        </div>
        {
          second
            ? <div className="col-sm-6">
              <div className="d-flex">
                <div className="flex-fill">{renderLabel(second.label)}:</div>
                <div className="flex-fill text-right">{module[second.name]}</div>
              </div>
            </div>
            : null
        }
      </div>;
    })
  }</>;
}

export default function ModuleFields({
  module, labels
}: {
  module?: Record<string, number | string> | null,
  labels: Record<string, Label>
}) {
  return <div className="mb-3 row">
    <div className="offset-sm-1 col-sm-10">
      <div className="card bg-light">
        <div className="card-body"> {
          module
            ? <ModuleRecord module={module} rows={getRows(labels)} />
            : "Selectionner une module."
        } </div>
      </div>
    </div>
  </div>;
}
