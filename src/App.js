import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import EntryScreen from './screens/entry/EntryScreen';
import ModalNavigator from './navigators/ModalNavigator';
import { store } from './store/store';

const AppNav = StackNavigator(
  {
    Entry: { screen: EntryScreen },
    ModalNavigator: { screen: ModalNavigator },
  },
  {
    headerMode: 'none',
  },
);

export default class App extends Component {
  componentDidMount() {
    const { dispatch } = store;
  }

  render() {
    return (
    <Provider store={store}>
      <AppNav />
    </Provider>
    );
  }
}
