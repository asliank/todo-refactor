import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
//import { store } from './redux/store';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from './routes';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <BrowserRouter >
          <Routes />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)