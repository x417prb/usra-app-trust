import React, { useState } from "react";
import { Project } from "./state/State";
import { ProjectValueName } from "./state/actions";
import {
  ρ, calcVd, calcVdmr,
  calcS, PVModules, calcIbi,
  BatteryModules,
  InverterModules,
  calcIic,
  Vdic,
} from "./state/reducer";

function formatExponentialNumber(x: number) {
  const [F, e] = x.toExponential(2).split("e");
  const E = parseInt(e, 10);
  return <>{F}&times;10<sup>{E}</sup></>;
}

export default function DimFieldsC({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  const [Lmr, setLMR] = useState(1);
  const [Lbi, setLBI] = useState(1);
  const [Lic, setLIC] = useState(1);
  const module = project.module;
  const Voc = module === -1 ? NaN : PVModules[module].Voc;
  const battery = project.battery;
  const Ƞb = battery === -1 ? NaN : BatteryModules[battery].Ƞ;
  const Vsystem = project.Vsystem;
  const inverter = project.inverter;
  const Pi = inverter == -1 ? NaN : InverterModules[inverter].Pnom;
  const Irated = project.Irated;
  const Vdmr = calcVdmr(Voc, project.Msc);
  const Smr = calcS(Irated, Lmr, Vdmr);
  const Ibi = calcIbi(Pi, Ƞb, Vsystem);
  const Vdbi = calcVd(Vsystem);
  const Sbi = calcS(Ibi, Lbi, Vdbi);
  const Iic = calcIic(Pi);
  const Sic = calcS(Iic, Lic, Vdic);
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
              value={Lmr}
              onChange={e => setLMR(e.target.valueAsNumber)}
            /></td>
            <td>{isFinite(Irated) ? Irated.toFixed(2) : "N/A"}</td>
            <td>{isFinite(Vdmr) ? Vdmr.toFixed(2) : "N/A"}</td>
            <td>{isFinite(Smr) ? Smr.toFixed(2) : "N/A"}</td>
          </tr>
          <tr>
            <th>Cables entre parc battries et l'oduleur</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={Lbi}
              onChange={e => setLBI(e.target.valueAsNumber)}
            /></td>
            <td>{isFinite(Ibi) ? Ibi.toFixed(2) : "N/A"}</td>
            <td>{isFinite(Vdbi) ? Vdbi.toFixed(2) : "N/A"}</td>
            <td>{isFinite(Sbi) ? Sbi.toFixed(2) : "N/A"}</td>
          </tr>
          <tr>
            <th>Cables entre L'onduleur et la charge</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={Lic}
              onChange={e => setLIC(e.target.valueAsNumber)}
            /></td>
            <td>{isFinite(Iic) ? Iic.toFixed(2) : "N/A"}</td>
            <td>{isFinite(Vdic) ? Vdic.toFixed(2) : "N/A"}</td>
            <td>{isFinite(Sic) ? Sic.toFixed(2) : "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>;
}
