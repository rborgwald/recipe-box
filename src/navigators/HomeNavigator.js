// @flow
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import SearchScreen from '../screens/search/SearchScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import {
  getCuisineTypes,
  getMealTypes,
  getPreparationTypes,
  getProteinTypes,
} from '../api/recipe/lookup';
import {
  setCuisineTypes,
  setMealTypes,
  setPreparationTypes,
  setProteinTypes,
} from '../store/actions';

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
    this.lookupTypes();
  }

  lookupTypes = () => {
    const { dispatch } = this.props;
    // TODO: figure out how to handle error(s)

    getMealTypes().then(types => {
      console.log('mealtypes: ' + JSON.stringify(types));
      dispatch(setMealTypes(types));
    });
    getCuisineTypes().then(types => {
      console.log('cuisinetypes: ' + JSON.stringify(types));
      dispatch(setCuisineTypes(types));
    });
    getProteinTypes().then(types => {
      console.log('proteintypes: ' + JSON.stringify(types));
      dispatch(setProteinTypes(types));
    });
    getPreparationTypes().then(types => {
      console.log('preparationtypes: ' + JSON.stringify(types));
      dispatch(setPreparationTypes(types));
    });
  };

  render() {
    return <HomeNav />;
  }
}

export default connect()(HomeNavWrapper);
