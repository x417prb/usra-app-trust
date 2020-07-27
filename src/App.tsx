import React from 'react';
import store from './state/store';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppHeader from './AppHeader';
import AppContent from './AppContent';

function App() {
  return <>
    <Provider store={store}>
      <BrowserRouter>
        <AppHeader />
        <AppContent />
      </BrowserRouter>
    </Provider>
  </>;
}

export default App;
