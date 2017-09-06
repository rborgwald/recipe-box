// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image, BackHandler } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import SideMenuItem from './components/SideMenuItem';
import logo from '../../images/logo.png';
import searchIcon from '../../images/search-icon.png';
import addRecipeIcon from '../../images/plus-icon.png';
import adminIcon from '../../images/admin-icon.png';
import logoutIcon from '../../images/logout-icon.png';

const styles = StyleSheet.create({
  outerContainerStyle: {
    flexDirection: 'column',
  },
  imageContainerStyle: {
    flexDirection: 'row',
    padding: 25,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    flex: 1,
    paddingTop: 153,
    tintColor: '#333',
    opacity: 0.75,
  },
});

type Props = {
  navigation: NavigationScreenProp,
};
export default class SideMenuContentScreen extends Component<any, Props, void> {
  handleSearchRecipePress = () => {
    this.props.navigation.navigate('Search');
  };

  handleAddRecipePress = () => {
    this.props.navigation.navigate('AddRecipe');
  };

  handleAdminPress = () => {
    this.props.navigation.navigate('Admin');
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
          title="Add Recipe"
          icon={addRecipeIcon}
          onPress={this.handleAddRecipePress}
        />
        <SideMenuItem
          title="Admin"
          icon={adminIcon}
          onPress={this.handleAdminPress}
        />
        <SideMenuItem
          title="Exit"
          icon={logoutIcon}
          onPress={() => BackHandler.exitApp()}
        />
      </View>
    );
  }
}
