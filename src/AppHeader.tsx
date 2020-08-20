import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NAME = "Simulateur PV";

function setTitle() {
  document.title = NAME;
}

export default function AppHeader() {
  useEffect(setTitle);
  return <nav className="navbar navbar-expand-lg navbar-dark bg-success d-print-none">
    <div className="container-md">
      <Link to="/" className="navbar-brand">
        <img src={process.env.PUBLIC_URL+"/Header-logo.png"} height="32" />
      </Link>
    </div>
  </nav>;
}
