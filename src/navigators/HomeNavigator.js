// @flow
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import SearchScreen from '../screens/search/SearchScreen';
import AdminScreen from '../screens/admin/AdminScreen';

export const HomeNav = TabNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    Manage: {
      screen: AdminScreen,
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#ffffff',
      activeBackgroundColor: '#444444',
      inactiveBackgroundColor: '#444444',
      labelStyle: {
        fontSize: 24,
      },
      tabStyle: {
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    },
  },
);

export class HomeNavWrapper extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <HomeNav />;
  }
}

export default HomeNavWrapper;
