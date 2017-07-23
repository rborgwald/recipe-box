// @flow
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import { connect } from 'react-redux';
import type { State, Store } from 'store/store';
import type { NavigationScreenProp } from 'react-navigation';

export const HomeNav = TabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
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
        fontSize: 14,
      },
      tabStyle: {
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    },
  },
);

type Props = {
  navigation: NavigationScreenProp,
  dispatch: $PropertyType<Store, 'dispatch'>,
};
export class HomeNavWrapper extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <HomeNav />;
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HomeNavWrapper);
