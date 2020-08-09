import React from 'react';
import store from './state/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppHeader from './AppHeader';
import AppContent from './AppContent';

function App() {
  return <>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <AppHeader />
        <AppContent />
      </Router>
    </Provider>
  </>;
}

export default App;
