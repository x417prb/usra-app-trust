import React from "react";

import { ProjectNeed, mutateCalcProjectNeed } from "./state/State";
import { List } from "immutable";
import { selectFiles } from "./utils/files";
import { parseCSV } from "./utils/csv";
import { clamp } from "./utils/math";

function reduceProjectTotalNeed(total: ProjectNeed, need: ProjectNeed) {
  total.prolifiratedPower += need.prolifiratedPower;
  total.quantity += need.quantity;
  total.energy += need.energy;
  total.hours += need.hours;
  total.power += need.power;
  return total;
}

function setNeedName(needs: List<ProjectNeed>, index: number, name: string) {
  return needs.set(index, {
    ...needs.get(index),
    name
  } as ProjectNeed);
}

function setNeedQuantity(needs: List<ProjectNeed>, index: number, quantity: number) {
  return needs.set(index, mutateCalcProjectNeed({
    ...needs.get(index),
    quantity
  } as ProjectNeed));
}

function setNeedPower(needs: List<ProjectNeed>, index: number, power: number) {
  return needs.set(index, mutateCalcProjectNeed({
    ...needs.get(index),
    power
  } as ProjectNeed));
}

function setNeedHours(needs: List<ProjectNeed>, index: number, hours: number) {
  return needs.set(index, mutateCalcProjectNeed({
    ...needs.get(index),
    hours
  } as ProjectNeed));
}

function toggleNeedSelected(needs: List<ProjectNeed>, index: number) {
  const need = needs.get(index)!;
  return needs.set(index, mutateCalcProjectNeed({
    ...need,
    selected: !need.selected
  } as ProjectNeed));
}

function addNeed(needs: List<ProjectNeed>) {
  return needs.push(mutateCalcProjectNeed({
    name: "",
    hours: 0,
    power: 0,
    quantity: 0,
    selected: false
  } as ProjectNeed))
}

function isNeedUnselected(need: ProjectNeed) {
  return !need.selected;
}

function NeedsTable({
  data, setData
}: {
  data: List<ProjectNeed>;
  setData(needs: List<ProjectNeed>): void;
}) {

  const total = data.reduce(reduceProjectTotalNeed, {
    name: "Total",
    energy: 0,
    hours: 0,
    power: 0,
    prolifiratedPower: 0,
    quantity: 0,
    selected: false
  });

  return <>
    <div className="table-responsive">
      <table className="table table-sm table-hover align-middle table-needs">
        <thead>
          <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <th scope="col" title="Nom de l'equipement">Equipement</th>
            <th scope="col" title="Nombre d'heurs d'uitilisation par jour">Utilisation (h/d)</th>
            <th scope="col" title="Quantité d'equipement utilisé">Quantité</th>
            <th scope="col" title="Puissance de l'equipement en KiloWatt">Puissance (Kw)</th>
            <th scope="col" title="Puissance des equipements en KiloWatt">Puissance foisonée (Kw)</th>
            <th scope="col" title="Energie consomée par les equipements en KiloWatt-heur par jour">Energie (Kwh/d)</th>
          </tr>
        </thead>
        {
          data.size >= 0 ? <>
            <tbody>{
              data.map((need, index) => (
                <tr
                  key={index}
                  tabIndex={-1}
                  style={{
                    cursor: "default"
                  }}
                  className={need.name ? "" : "table-warning"}
                  onClick={e => {
                    // @ts-ignore
                    if (e.target.tagName !== "TD") return;
                    setData(toggleNeedSelected(data, index))
                  }}
                >
                  <td className="d-print-none">{
                    need.selected
                      ? <span role="img" aria-label="Selectionné">✔️</span>
                      : null
                  }</td>
                  <th><input
                    type="text"
                    className="form-control-plaintext"
                    value={need.name}
                    onChange={e => setData(setNeedName(data, index, e.target.value))}
                  /></th>
                  <td><input
                    type="number"
                    min="1" max="24" step="0"
                    className="form-control-plaintext"
                    value={Math.round(need.hours)}
                    onChange={e => setData(setNeedHours(data, index, e.target.valueAsNumber))}
                  /></td>
                  <td><input
                    type="number"
                    min="0" step="1"
                    className="form-control-plaintext"
                    value={Math.round(need.quantity)}
                    onChange={e => setData(setNeedQuantity(data, index, e.target.valueAsNumber))}
                  /></td>
                  <td><input
                    type="number"
                    min="0" step="0.01"
                    className="form-control-plaintext"
                    value={need.power.toFixed(2)}
                    onChange={e => setData(setNeedPower(data, index, e.target.valueAsNumber))}
                  /></td>
                  <td>{need.prolifiratedPower.toFixed(2)}</td>
                  <td>{need.energy.toFixed(2)}</td>
                </tr>
              ))
            }</tbody><tfoot>
              <tr>
                <td className="d-print-none"></td>
                <th scope="row">Total</th>
                <td>{Math.round(total!.hours)}</td>
                <td>{Math.round(total!.quantity)}</td>
                <td>{total!.power.toFixed(2)}</td>
                <td>{total!.prolifiratedPower.toFixed(2)}</td>
                <td>{total!.energy.toFixed(2)}</td>
              </tr>
            </tfoot>
          </> : null
        }
      </table>
    </div>
    <div className="d-flex flex-wrap justify-content-evenly mb-2">
      <button
        disabled={data.every(isNeedUnselected)}
        onClick={e => {
          if (!window.confirm("Voulez vous annuler la suppression des lignes ?")) {
            setData(data.filter(isNeedUnselected));
          }
        }}
        type="button"
        className="btn btn-danger"
        title="Supprimer la selection"
      >Supprimer</button>
      <button
        onClick={async e => {
          try {
            const file = await selectFiles({
              accept: '.csv',
              multiple: false
            });
            // @ts-ignore
            const content = await file.text();
            const values: ProjectNeed[] = parseCSV(content, ([name, hours, quantity, power]) => mutateCalcProjectNeed({
              name,
              hours: clamp(parseInt(hours), 1, 24),
              quantity: Math.max(1, parseInt(quantity)),
              power: Math.max(0, parseFloat(power)),
              selected: false
            } as ProjectNeed));
            setData(data.push(...values));
          } catch (e) {
            console.warn(e);
          }
        }}
        type="button"
        className="btn btn-warning"
      >Importer</button>
      <button
        onClick={e => setData(addNeed(data))}
        type="button"
        className="btn btn-success"
      >Ajouter</button>
    </div>
  </>;

}

export default function ProjectNeedsTable({
  current, needs, setNeeds
}: {
  current: number;
  needs: List<ProjectNeed>;
  setNeeds(id: number, needs: List<ProjectNeed>): void;
}) {
  const data = needs;
  return <NeedsTable
    data={data}
    setData={data => setNeeds(current, data)}
  />;
};
