/* @flow */
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Admin from './components/Admin';

export class AdminScreen extends Component<any, Props, void> {
  static navigationOptions = {
    title: 'Manage'
  };

  render() {
    return (
      <Admin>
      </Admin>
    );
  }
}

export default StackNavigator({
  Admin: {
    screen: AdminScreen,
  },
});