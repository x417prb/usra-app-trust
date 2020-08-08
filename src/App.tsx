import React from 'react';
import store from './state/store';

import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppHeader from './AppHeader';
import AppContent from './AppContent';

function App() {
  return <>
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        <AppContent />
      </HashRouter>
    </Provider>
  </>;
}

export default App;
