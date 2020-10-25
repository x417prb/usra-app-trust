import React, { useState } from "react";

import {
  BatteryModules,
  InverterModules,
  PVModules,
  RegulatorModules,
} from "./state/reducer";

function useSave(name: string, ref: unknown) {
  const [toggle, set] = useState(false);
  return [
    () => {
      localStorage.setItem("pv", JSON.stringify(ref));
      set(!toggle);
    },
    () => {
      localStorage.removeItem("pv");
      window.location.reload();
    },
  ];
}

let pvId = 0,
  battrieId = 0,
  inverterId = 0,
  regulatorId = 0;

function Regulateurs() {
  const [save, reset] = useSave("regulators", RegulatorModules);
  return (
    <section>
      <h2>Modules Regulateurs</h2>
      <button
        className="btn btn-outline-success mr-1"
        onClick={(e) => {
          RegulatorModules.push({
            name: `Regulator #${regulatorId++}`,
            I: 0,
            Vout: 0,
          });
          save();
        }}
      >
        Ajouter
      </button>
      <button className="btn btn-outline-warning" onClick={reset}>
        Reinitialiser
      </button>
      <div className="table-responsive-xxl">
        <table
          className="table table-sm table-hover align-middle table-needs p-1"
          style={{ minWidth: "60rem" }}
        >
          <thead>
            <tr>
              <td>Nom</td>
              <td>Courant</td>
              <td>Tension de parc battries</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {RegulatorModules.map((model, index) => (
              <tr key={index}>
                <th>
                  <input
                    type="text"
                    className="form-control-plaintext ml-1"
                    value={model.name}
                    onChange={(e) => {
                      model.name = e.target.value;
                      save();
                    }}
                  />
                </th>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.I}
                      onChange={(e) => {
                        model.I = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    A
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Vout}
                      onChange={(e) => {
                        model.Vout = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger ml-1"
                    onClick={() => {
                      if (window.confirm(`Supprimer ${model.name} ?`)) {
                        RegulatorModules.splice(index, 1);
                        save();
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Onduleurs() {
  const [save, reset] = useSave("inverters", InverterModules);
  return (
    <section>
      <h2>Modules Battries</h2>
      <button
        className="btn btn-outline-success mr-1"
        onClick={(e) => {
          InverterModules.push({
            vendor: `Generic #${inverterId++}`,
            PVmpp: [0, 0],
            Pnom: 0,
            Vmax: 0,
            Ƞ: 0,
          });
          save();
        }}
      >
        Ajouter
      </button>
      <button className="btn btn-outline-warning" onClick={reset}>
        Reinitialiser
      </button>
      <div className="table-responsive-xxl">
        <table
          className="table table-sm table-hover align-middle table-needs p-1"
          style={{ minWidth: "60rem" }}
        >
          <thead>
            <tr>
              <td>Marque</td>
              <td>Plage de tension MPP</td>
              <td>Puissance nominale</td>
              <td>Tension maximal</td>
              <td>Rendement</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {InverterModules.map((model, index) => (
              <tr key={index}>
                <th>
                  <input
                    type="text"
                    className="form-control-plaintext ml-1"
                    value={model.vendor}
                    onChange={(e) => {
                      model.vendor = e.target.value;
                      save();
                    }}
                  />
                </th>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    {"["}
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.PVmpp[0]}
                      onChange={(e) => {
                        model.PVmpp[0] = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    {"V, "}
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.PVmpp[1]}
                      onChange={(e) => {
                        model.PVmpp[1] = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    {"V]"}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Pnom}
                      onChange={(e) => {
                        model.Pnom = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Vmax}
                      onChange={(e) => {
                        model.Vmax = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Ƞ}
                      onChange={(e) => {
                        model.Ƞ = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    Wc
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger ml-1"
                    onClick={() => {
                      if (window.confirm(`Supprimer ${model.vendor} ?`)) {
                        InverterModules.splice(index, 1);
                        save();
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Batteries() {
  const [save, reset] = useSave("battries", BatteryModules);
  return (
    <section>
      <h2>Modules Battries</h2>
      <button
        className="btn btn-outline-success mr-1"
        onClick={(e) => {
          BatteryModules.push({
            model: `Battrie #${battrieId++}`,
            vendor: "ACMA",
            Cnom: 0,
            Vnom: 0,
            Ƞ: 0,
          });
          save();
        }}
      >
        Ajouter
      </button>
      <button className="btn btn-outline-warning" onClick={reset}>
        Reinitialiser
      </button>
      <div className="table-responsive-xxl">
        <table
          className="table table-sm table-hover align-middle table-needs p-1"
          style={{ minWidth: "60rem" }}
        >
          <thead>
            <tr>
              <td>Model</td>
              <td>Marque</td>
              <td>Tension nominale</td>
              <td>Capacite nominale</td>
              <td>Rendement</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {BatteryModules.map((model, index) => (
              <tr key={index}>
                <th>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={model.model}
                    onChange={(e) => {
                      model.model = e.target.value;
                      save();
                    }}
                  />
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext ml-1"
                    value={model.vendor}
                    onChange={(e) => {
                      model.vendor = e.target.value;
                      save();
                    }}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Vnom}
                      onChange={(e) => {
                        model.Vnom = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Cnom}
                      onChange={(e) => {
                        model.Cnom = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Ƞ}
                      onChange={(e) => {
                        model.Ƞ = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    Wc
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger ml-1"
                    onClick={() => {
                      if (window.confirm(`Supprimer ${model.model} ?`)) {
                        BatteryModules.splice(index, 1);
                        save();
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PV() {
  const [save, reset] = useSave("pv", PVModules);
  return (
    <section>
      <h2>Modules PV</h2>
      <button
        className="btn btn-outline-success mr-1"
        onClick={(e) => {
          PVModules.push({
            name: `PV #${pvId++}`,
            type: "Polycristalline",
            Imp: 0,
            Isc: 0,
            Pm: 0,
            Vmp: 0,
            Voc: 0,
            output: 0,
            temperture: [0, 0],
          });
          save();
        }}
      >
        Ajouter
      </button>
      <button className="btn btn-outline-warning" onClick={reset}>
        Reinitialiser
      </button>
      <div className="table-responsive-xxl">
        <table
          className="table table-sm table-hover align-middle table-needs p-1"
          style={{ minWidth: "60rem" }}
        >
          <thead>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Tension en circuit ouvert</td>
              <td>Tension de puissance max</td>
              <td>Puissance max</td>
              <td>Courant de court-circuit</td>
              <td>Courant de puissance max</td>
              <td>Sortie</td>
              <td>Temperture</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {PVModules.map((model, index) => (
              <tr key={index}>
                <th>
                  <input
                    type="text"
                    className="form-control-plaintext"
                    value={model.name}
                    onChange={(e) => {
                      model.name = e.target.value;
                      save();
                    }}
                  />
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control-plaintext ml-1"
                    value={model.type}
                    onChange={(e) => {
                      model.type = e.target.value;
                      save();
                    }}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Voc}
                      onChange={(e) => {
                        model.Voc = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Vmp}
                      onChange={(e) => {
                        model.Vmp = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    V
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Pm}
                      onChange={(e) => {
                        model.Pm = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    Wc
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Isc}
                      onChange={(e) => {
                        model.Isc = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    A
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.Imp}
                      onChange={(e) => {
                        model.Imp = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    A
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.output}
                      onChange={(e) => {
                        model.output = e.target.valueAsNumber;
                        save();
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ml-1">
                    {"["}
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.temperture[0]}
                      onChange={(e) => {
                        model.temperture[0] = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    {"°C, "}
                    <input
                      type="number"
                      className="form-control-plaintext text-right"
                      value={model.temperture[1]}
                      onChange={(e) => {
                        model.temperture[1] = e.target.valueAsNumber;
                        save();
                      }}
                    />
                    {"°C]"}
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger ml-1"
                    onClick={() => {
                      if (window.confirm(`Supprimer ${model.name} ?`)) {
                        PVModules.splice(index, 1);
                        save();
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ModelsView() {
  return (
    <>
      <Regulateurs />
      <PV />
      <Batteries />
      <Onduleurs />
    </>
  );
}
