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

const ModalNavWrapper = () => <ModalNav />;

export default ModalNavWrapper;
