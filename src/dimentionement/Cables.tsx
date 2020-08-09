import React from "react";
import { Project } from "../state/State";
import { ProjectValueName } from "../state/actions";
import {
  ρ, calcVd, calcVdmr,
  calcS, PVModels, calcIbi,
  BatteryModules,
  InverterModules,
  calcIic,
  Vdic,
} from "../state/reducer";
import { n } from "../utils/numbers";

function formatExponentialNumber(x: number) {
  const [F, e] = x.toExponential(2).split("e");
  const E = parseInt(e, 10);
  return <>{F}&times;10<sup>{E}</sup></>;
}

export default function DimCables({
  project, setValue
}: {
  project: Project;
  setValue(name: ProjectValueName, value: number): void;
}) {
  const Lmr = project.Lmr;
  const Lbi = project.Lbi;
  const Lic = project.Lic;
  const module = project.module;
  const Voc = module === -1 ? NaN : PVModels[module].Voc;
  const battery = project.battery;
  const Ƞb = battery === -1 ? NaN : BatteryModules[battery].Ƞ;
  const Vsystem = project.Vsystem;
  const inverter = project.inverter;
  const Pi = inverter === -1 ? NaN : InverterModules[inverter].Pnom;
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
              onChange={e => setValue("Lmr", e.target.valueAsNumber)}
            /></td>
            <td>{n(Irated, 2)}</td>
            <td>{n(Vdmr, 2)}</td>
            <td>{n(Smr, 2)}</td>
          </tr>
          <tr>
            <th>Cables entre parc battries et l'oduleur</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={Lbi}
              onChange={e => setValue("Lbi", e.target.valueAsNumber)}
            /></td>
            <td>{n(Ibi, 2)}</td>
            <td>{n(Vdbi, 2)}</td>
            <td>{n(Sbi, 2)}</td>
          </tr>
          <tr>
            <th>Cables entre L'onduleur et la charge</th>
            <td>{formatExponentialNumber(ρ)}</td>
            <td><input
              type="number"
              min="0" step="0.01"
              className="form-control-plaintext"
              value={Lic}
              onChange={e => setValue("Lic", e.target.valueAsNumber)}
            /></td>
            <td>{n(Iic, 2)}</td>
            <td>{n(Vdic, 2)}</td>
            <td>{n(Sic, 2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>;
}
