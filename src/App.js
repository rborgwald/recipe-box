// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import EntryScreen from './screens/entry/EntryScreen';
import ModalNavigator from './navigators/ModalNavigator';
import { store } from './store/store';

const RecipeBoxNav = StackNavigator(
  {
    Entry: { screen: EntryScreen },
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
