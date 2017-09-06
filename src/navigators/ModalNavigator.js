/* @flow */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import SideMenuNavigator from './SideMenuNavigator';

export const ModalNav = StackNavigator(
  {
    SideMenuNavigator: {
      screen: SideMenuNavigator,
    },
  },
  {
    mode: 'modal',
  },
);

const ModalNavWrapper = () => <ModalNav />;

export default ModalNavWrapper;
