/* @flow */
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeNavigator from './HomeNavigator';
import type { NavigationScreenProp } from 'react-navigation';

export const ModalNav = StackNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator,
    },
  },
  {
    mode: 'modal',
  },
);

type Props = {
  navigation: NavigationScreenProp,
};
export class ModalNavWrapper extends Component<any, Props, void> {

  render() {
    return <ModalNav />;
  }
}

export default ModalNavWrapper;
