// @flow
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import SearchScreen from '../screens/search/SearchScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import {getCuisineTypes, getMealTypes, getPreparationTypes, getProteinTypes} from '../api/recipe/lookup';

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

  componentDidMount() {
    // get all lookups
    getMealTypes().then(types => {
      console.log('mealtypes: ' + JSON.stringify(types));
    });
    getCuisineTypes().then(types => {
      console.log('cuisinetypes: ' + JSON.stringify(types));
    });
    getProteinTypes().then(types => {
      console.log('proteintypes: ' + JSON.stringify(types));
    });
    getPreparationTypes().then(types => {
      console.log('preparationtypes: ' + JSON.stringify(types));
    });
  }

  render() {
    return <HomeNav />;
  }
}

export default HomeNavWrapper;
