import React from "react";

import { Route, Switch } from "react-router";

import ProjectView from "./ProjectView";
import ModelsView from "./ModelsView";

export default function AppContent() {
  return (
    <div className="container-md">
      <div className="d-print-none mt-3"></div>
      <Switch>
        <Route exact path="/" component={ProjectView} />
        <Route path="/p/:id" component={ProjectView} />
        <Route path="/models" component={ModelsView} />
      </Switch>
    </div>
  );
}
