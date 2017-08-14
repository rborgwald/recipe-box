// @flow
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import _ from 'lodash';
import { connect } from 'react-redux';
import type { Store } from '../store/store';
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
    Add: {
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
        paddingBottom: 5,
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

  componentDidMount() {
    this.lookupTypes();
  }

  lookupTypes = () => {
    const { dispatch } = this.props;
    // TODO: figure out how to handle error(s)

    getMealTypes().then(types => {
      // Sort the types
      const sortedById = types.sort((a, b) => a.id - b.id);

      // Add index to each type
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setMealTypes(sortedById));
    });
    getCuisineTypes().then(types => {
      const sortedById = types.sort((a, b) => a.id - b.id);
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setCuisineTypes(types));
    });
    getProteinTypes().then(types => {
      const sortedById = types.sort((a, b) => a.id - b.id);
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setProteinTypes(types));
    });
    getPreparationTypes().then(types => {
      const sortedById = types.sort((a, b) => a.id - b.id);
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setPreparationTypes(types));
    });
  };

  render() {
    return <HomeNav />;
  }
}

export default connect()(HomeNavWrapper);
