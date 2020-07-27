import React from "react";
import { Link, useLocation } from "react-router-dom";

function navlinkClass(path: string, start: string) {
  return `nav-link${path.startsWith(start) ? " active" : ""}`;
}

function navlinkClassExact(path: string, start: string) {
  return `nav-link${path === start ? " active" : ""}`;
}

export default function AppHeader() {
  const path = useLocation().pathname;
  return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-md">
      <Link to="/" className="navbar-brand">Trust Energy</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className={navlinkClassExact(path, "/")} href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className={navlinkClass(path, "/project")} href="/project">Projects</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>;
}
