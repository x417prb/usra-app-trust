import React from 'react';
import ProjectView from './ProjectView';

import { Route } from 'react-router';

export default function AppContent() {
  return <div className="container-md">
    <div className="d-print-none mt-3"></div>
    <Route
      exact
      path="/"
      component={ProjectView}
    />
    <Route
      path="/:id"
      component={ProjectView}
    />
  </div>;
}
