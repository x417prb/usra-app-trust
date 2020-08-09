import React from "react";
import { Project } from "../state/State";
import { ProjectValueName } from "../state/actions";

import { ρ, Vic } from "../state/reducer";
import { n } from "../utils/numbers";

function formatExponentialNumber(x: number) {
  const [F, e] = x.toExponential(2).split("e");
  const E = parseInt(e, 10);
  return <>{F}&times;10<sup>{E}</sup></>;
}

export default function Cables({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  return <>
    <div className="table-responsive">
      <table className="table table-sm table-hover align-middle">
        <thead>
          <tr>
            <th></th>
            <th>ρ (Ωm)</th>
            <th>L (m)</th>
            <th>I (A)</th>
            <th>V<sub>d</sub> (V)</th>
            <th>S (mm<sup>2</sup>)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Cables entre PV et regulateur</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={project.Lmr}
              onChange={e => setValue("Lmr", e.target.valueAsNumber)}
            /></td>
            <td>{n(project.Irated, 2)}</td>
            <td>{n(project.Vmr, 2)}</td>
            <td>{n(project.Smr, 2)}</td>
          </tr>
          <tr>
            <th>Cables entre parc battries et l'oduleur</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={project.Lbi}
              onChange={e => setValue("Lbi", e.target.valueAsNumber)}
            /></td>
            <td>{n(project.Ibi, 2)}</td>
            <td>{n(project.Vbi, 2)}</td>
            <td>{n(project.Sbi, 2)}</td>
          </tr>
          <tr>
            <th>Cables entre L'onduleur et la charge</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={project.Lic}
              onChange={e => setValue("Lic", e.target.valueAsNumber)}
            /></td>
            <td>{n(project.Iic, 2)}</td>
            <td>{n(Vic, 2)}</td>
            <td>{n(project.Sic, 2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>;
}
