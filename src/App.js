import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';
import SplashScreen from './screens/splash/SplashScreen';
import SearchScreen from './screens/search/SearchScreen';
import AdminScreen from './screens/admin/AdminScreen';
import ModalNavigator from './navigators/ModalNavigator';
import { StackNavigator } from 'react-navigation';

const RecipeBox = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    ModalNavigator: { screen: ModalNavigator },

  },
  {
    headerMode: 'none',
  },
);

AppRegistry.registerComponent('RecipeBox', () => RecipeBox);
