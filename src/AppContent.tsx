import React from 'react';
import ProjectView from './ProjectView';

import { Route } from 'react-router';

export default function AppContent() {
  return <div className="container-md py-3">
    <Route
      exact
      path="/project"
      component={ProjectView}
    />
    <Route
      path="/project/:id"
      component={ProjectView}
    />
  </div>;
}
