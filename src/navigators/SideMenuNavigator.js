// @flow
import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import _ from 'lodash';
import { connect } from 'react-redux';
import type { Store } from '../store/store';
import SearchScreen from '../screens/search/SearchScreen';
import AddRecipeScreen from '../screens/add-recipe/AddRecipeScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import SideMenuContentScreen from '../screens/side-menu-content/SideMenuContentScreen';
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

export const SideMenuNav = DrawerNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    AddRecipe: {
      screen: AddRecipeScreen,
    },
    Admin: {
      screen: AdminScreen,
    },
  },
  {
    contentComponent: SideMenuContentScreen,
  },
);

type Props = {
  navigation: NavigationScreenProp,
  dispatch: $PropertyType<Store, 'dispatch'>,
};

export class SideMenuNavWrapper extends Component<any, Props, void> {
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
    return <SideMenuNav />;
  }
}

export default connect()(SideMenuNavWrapper);
