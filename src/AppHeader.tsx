import React from "react";
import { Link } from "react-router-dom";

// function navlinkClass(path: string, start: string) {
//   return `nav-link${path.startsWith(start) ? " active" : ""}`;
// }

// function navlinkClassExact(path: string, start: string) {
//   return `nav-link${path === start ? " active" : ""}`;
// }

export default function AppHeader() {
  // const path = useLocation().pathname;
  return <nav className="navbar navbar-expand-lg navbar-dark bg-success d-print-none">
    <div className="container-md">
      <Link to="/" className="navbar-brand">Sun Sim</Link>
    </div>
  </nav>;
}
