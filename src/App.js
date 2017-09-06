// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/splash/SplashScreen';
import ModalNavigator from './navigators/ModalNavigator';
import { store } from './store/store';

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
