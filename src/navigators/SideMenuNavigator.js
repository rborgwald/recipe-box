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
import RecipeListScreen from '../screens/recipe-lists/RecipeListScreen';
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
  setRecipeLists,
} from '../store/actions';
import {
  getRecipeListsForUser,
  getRecipesForList,
} from '../api/recipe/recipeLists';

export const SideMenuNav = DrawerNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    RecipeList: {
      screen: RecipeListScreen,
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
  username: $PropertyType<StoreState, 'username'>,
};

export class SideMenuNavWrapper extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.lookupTypes();
    this.getRecipeLists();
  }

  getRecipeLists = () => {
    const { dispatch, token, username } = this.props;
    const newRecipeLists = [];

    getRecipeListsForUser(token, username).then(recipeListsFromApi => {
      const promises = [];

      recipeListsFromApi.forEach(recipeList => {
        promises.push(
          getRecipesForList(token, recipeList.id).then(recipes => {
            const newRecipeList = {
              id: recipeList.id,
              name: recipeList.name,
              recipes,
            };
            newRecipeLists.push(newRecipeList);
            Promise.resolve();
          }),
        );
      });
      Promise.all(promises).then(() => {
        dispatch(setRecipeLists(newRecipeLists));
      });
    });
  };

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
  username: state.username,
});

export default connect(mapStateToProps)(SideMenuNavWrapper);
