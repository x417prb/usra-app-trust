import React, { useState, useEffect } from "react";
import { Project } from "./state/State";
import { PVModels, RegulatorModels, InverterModules } from "./state/reducer";
import { n } from "./utils/numbers";

function getTimeStamp() {
  return Math.floor(Date.now() / 1000) * 1000;
}

function padInt(n: number, size = 2) {
  return n.toString().padStart(size, '0');
}

function getMonth(date: Date) {
  return padInt(date.getMonth() + 1);
}

function getDate(date: Date) {
  return padInt(date.getDate());
}

function getHours(date: Date) {
  return padInt(date.getHours());
}

function getMinutes(date: Date) {
  return padInt(date.getMinutes());
}

function formatDateStamp(stamp: number) {
  const date = new Date(stamp);
  return <>{getDate(date)}/{getMonth(date)}/{date.getFullYear()} {getHours(date)}:{getMinutes(date)}</>;
}

export default function Report({
  project
}: {
  project: Project
}) {

  const [stamp, setStamp] = useState(getTimeStamp());

  useEffect(() => {
    const id = setInterval(() => setStamp(getTimeStamp()), 1000);
    return () => clearInterval(id);
  }, [stamp]);

  const PVPuissanceProduite = n(PVModels[project.module]?.Pm, 2, "Kw");
  const PVNombreSerie = n(project.Msc);
  const PVNombreParallel = n(project.Mpc);
  const PVNombreTotal = n(project.Mt);

  const BatCapacite = n(project.Cx, 2, "Ah");
  const BatNombreSerie = n(project.Bsc);
  const BatNombreParallel = n(project.Bpc);
  const BatNombreTotal = n(project.Bt);

  const RegCapacite = n(RegulatorModels[project.regulator]?.I, 2, "A");
  const RegNombre = n(project.Rc);

  const OndCapacite = n(InverterModules[project.inverter]?.Pnom, 2, "KVA");
  const OndBesoinEntre = n(project.Vsystem, undefined, "V");
  const OndNombre = n(project.nombreOnduleur);

  const CablePVReg = `${n(project.Irated, 2, "A")}; ${n(project.Smr, 2, "mm²")}`;
  const CableBatsOnd = `${n(project.Ibi, 2, "A")}; ${n(project.Sbi, 2, "mm²")}`;
  const CableOndCharge = `${n(project.Iic, 2, "A")}; ${n(project.Sic, 2, "mm²")}`;

  return <>
    <div className="border rounded-sm border-secondary text-center p-2">
      <div className="row justify-content-between align-items-center mb-3">
        <div className="d-none d-print-flex col-3 align-items-center justify-content-start"><img src={process.env.PUBLIC_URL + "/Header-logo.png"} height="32" alt="Trust Energy" /></div>
        <div className="d-none d-print-block col-6">
          Date de simulation: {formatDateStamp(stamp)}
        </div>
        <div className="d-print-none">
          Date de simulation: {formatDateStamp(stamp)}
          <div className="d-print-none my-1">
            <button
              className="btn btn-success"
              onClick={() => window.print()}
            >Imprimer</button>
          </div>
        </div>
        <div className="d-none d-print-flex col-3 align-items-center justify-content-end"><img src={process.env.PUBLIC_URL + "/logo-carré.png"} height="32" alt="" /></div>
      </div>
    </div>
    <div className="border rounded-sm border-secondary mt-1 p-2">
      <div className="d-flex flex-column justify-content-center align-items-stretch text-center">
        <h1>Syst&egrave;me isol&eacute; avec battries</h1>
        <h3>rapport de simulation</h3>
      </div>
      <p><b>Nom du projet</b>: {project.name}</p>
      <p><b>Site geographique</b>: {project.site}</p>
      <p><b>La consomation moyenne journali&egrave;re</b>: {project.energyBesoinTotal} Kwh/j</p>
      <p><b>La production energetique</b>: {PVPuissanceProduite}</p>
      <p><b>Capacite de stockage</b>: {BatCapacite}</p>
      <figure className="text-center p-1">
        <img width="60%" className="border rounded-sm border-secondary p-3" src={(process.env.PUBLIC_URL + "/diagram.svg").replace(/\/\//, "/")} alt="Schema de l'installation" />
        <figcaption className="figure-caption">Schema de l'installation.</figcaption>
      </figure>
      <h5>Bilan de dimensionnement</h5>
      <div className="table-responsive">
        <table className="table table-bordered border border-secondary text-center align-middle">
          <thead>
            <th className="border border-secondary">Composant</th>
            <th className="border border-secondary">Description du composant</th>
            <th className="border border-secondary">Resultats</th>
          </thead>
          <tbody>
            <tr>
              <th>Estimation du besoin</th>
              <td className="text-left">L'energie moyenne journaliere a consommer</td>
              <td>{project.energyBesoinTotal} Kwh/j</td>
            </tr>
            <tr>
              <th rowSpan={4}>ChampPV</th>
              <td className="text-left">La puissance produite</td>
              <td>{PVPuissanceProduite}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre de PV en serie</td>
              <td>{PVNombreSerie}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre de PV en parallel</td>
              <td>{PVNombreParallel}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre total des panneaux</td>
              <td>{PVNombreTotal}</td>
            </tr>
            <tr>
              <th rowSpan={4}>Parc batteries</th>
              <td className="text-left">La capacite des batteries</td>
              <td>{BatCapacite}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre de battries en serie</td>
              <td>{BatNombreSerie}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre des battries en parallel</td>
              <td>{BatNombreParallel}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre total des battries</td>
              <td>{BatNombreTotal}</td>
            </tr>
            <tr>
              <th rowSpan={2}>Regulateur</th>
              <td className="text-left">Capacite du regulateur</td>
              <td>{RegCapacite}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre de regulateur</td>
              <td>{RegNombre}</td>
            </tr>
            <tr>
              <th rowSpan={3}>Onduleur</th>
              <td className="text-left">Capacite d'onduleur</td>
              <td>{OndCapacite}</td>
            </tr>
            <tr>
              <td className="text-left">Besoin d'entree</td>
              <td>{OndBesoinEntre}</td>
            </tr>
            <tr>
              <td className="text-left">Nombre d'onduleur</td>
              <td>{OndNombre}</td>
            </tr>
            <tr>
              <th rowSpan={3}>Cables</th>
              <td className="text-left">Entre champ PV et regulateur</td>
              <td>{CablePVReg}</td>
            </tr>
            <tr>
              <td className="text-left">Entre battries et onduleur</td>
              <td>{CableBatsOnd}</td>
            </tr>
            <tr>
              <td className="text-left">Entre onduleur et charge</td>
              <td>{CableOndCharge}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-print-none text-center">
        <button
          className="btn btn-success"
          onClick={() => window.print()}
        >Imprimer</button>
      </div>
    </div>
  </>;
}
