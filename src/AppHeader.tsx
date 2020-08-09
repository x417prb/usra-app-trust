import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NAME = "Stern Sim";

function setTitle() {
  document.title = NAME;
}

export default function AppHeader() {
  useEffect(setTitle);
  return <nav className="navbar navbar-expand-lg navbar-dark bg-success d-print-none">
    <div className="container-md">
      <Link to="/" className="navbar-brand">{NAME}</Link>
    </div>
  </nav>;
}
