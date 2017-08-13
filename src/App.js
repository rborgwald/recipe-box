// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from './screens/splash/SplashScreen';
import ModalNavigator from './navigators/ModalNavigator';
import { store } from './store/store';
import { StackNavigator } from 'react-navigation';

const RecipeBoxNav = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    ModalNavigator: { screen: ModalNavigator },
  },
  {
    headerMode: 'none',
  },
);

const App = () =>
  <Provider store={store}>
    <RecipeBoxNav />
  </Provider>;

export default App;
