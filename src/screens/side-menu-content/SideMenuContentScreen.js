// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import type { Store } from '../../store/store';
import SideMenuItem from './components/SideMenuItem';
import logo from '../../images/logo.png';
import searchIcon from '../../images/search-icon.png';
import recipeListIcon from '../../images/recipe_list_icon.png';
import addRecipeIcon from '../../images/plus-icon.png';
import adminIcon from '../../images/admin-icon.png';
import usersIcon from '../../images/users_icon.png';
import logoutIcon from '../../images/logout-icon.png';
import { deleteToken } from '../../utils/storage';
import {setLogout, setRecipe} from '../../store/actions';

const styles = StyleSheet.create({
  outerContainerStyle: {
    flexDirection: 'column',
  },
  imageContainerStyle: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    flex: 1,
    paddingTop: 120,
    tintColor: '#333',
    opacity: 0.75,
  },
});

type Props = {
  navigation: NavigationScreenProp,
  dispatch: $PropertyType<Store, 'dispatch'>,
};
export class SideMenuContentScreen extends Component<any, Props, void> {
  handleSearchRecipePress = () => {
    this.props.navigation.navigate('Search');
  };

  handleRecipeListPress = () => {
    this.props.navigation.navigate('RecipeList');
  };

  handleAddRecipePress = () => {
    const { dispatch } = this.props;
    dispatch(setRecipe(null));
    this.props.navigation.navigate('AddRecipe');
  };

  handleAdminPress = () => {
    this.props.navigation.navigate('Admin');
  };

  handleLogoutPress = () => {
    const { dispatch } = this.props;

    return deleteToken().then(() => {
      dispatch(setLogout());

      BackHandler.exitApp();
    });
  };

  handleUsersPress = () => {
    this.props.navigation.navigate('Users');
  };

  render() {
    return (
      <View style={styles.outerContainerStyle}>
        <View style={styles.imageContainerStyle}>
          <Image source={logo} style={styles.imageStyle} />
        </View>
        <SideMenuItem
          title="Search Recipe"
          icon={searchIcon}
          onPress={this.handleSearchRecipePress}
        />
        <SideMenuItem
          title="Recipe Lists"
          icon={recipeListIcon}
          onPress={this.handleRecipeListPress}
        />
        <SideMenuItem
          title="Add Recipe"
          icon={addRecipeIcon}
          onPress={this.handleAddRecipePress}
        />
        <SideMenuItem
          title="Recipe Admin"
          icon={adminIcon}
          onPress={this.handleAdminPress}
        />
        <SideMenuItem
          title="User Admin"
          icon={usersIcon}
          onPress={this.handleUsersPress}
        />
        <SideMenuItem
          title="Logout"
          icon={logoutIcon}
          onPress={this.handleLogoutPress}
        />
      </View>
    );
  }
}

export default connect()(SideMenuContentScreen);
