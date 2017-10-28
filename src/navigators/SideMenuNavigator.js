// @flow
import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import _ from 'lodash';
import { connect } from 'react-redux';
import type { Store, State as StoreState } from '../store/store';
import SearchScreen from '../screens/search/SearchScreen';
import AddRecipeScreen from '../screens/add-recipe/AddRecipeScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import UsersScreen from '../screens/users/UsersScreen';
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
    Users: {
      screen: UsersScreen,
    },
  },
  {
    contentComponent: SideMenuContentScreen,
  },
);

type Props = {
  navigation: NavigationScreenProp,
  dispatch: $PropertyType<Store, 'dispatch'>,
  token: $PropertyType<StoreState, 'token'>,
};

export class SideMenuNavWrapper extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.lookupTypes();
  }

  lookupTypes = () => {
    const { dispatch, token } = this.props;
    // TODO: figure out how to handle error(s)

    getMealTypes(token).then(types => {
      const sortedById = types.sort(
        (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
      );
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setMealTypes(sortedById));
    });
    getCuisineTypes(token).then(types => {
      const sortedById = types.sort(
        (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
      );
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setCuisineTypes(types));
    });
    getProteinTypes(token).then(types => {
      const sortedById = types.sort(
        (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
      );
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setProteinTypes(types));
    });
    getPreparationTypes(token).then(types => {
      const sortedById = types.sort(
        (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
      );
      _.map(sortedById, (e, i) => _.extend(e, { idx: i + 1 }));
      dispatch(setPreparationTypes(types));
    });
  };

  render() {
    return <SideMenuNav />;
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(SideMenuNavWrapper);
