import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

import {Provider as ReduxProvider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './app/reducers';
const store = createStore(allReducers);

const AppWithStore = () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => AppWithStore);
