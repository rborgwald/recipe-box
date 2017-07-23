import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';
import EntryScreen from './screens/entry/EntryScreen';
import SearchScreen from './screens/search/SearchScreen';
import { StackNavigator } from 'react-navigation';

const RecipeBox = StackNavigator({
  Entry: { screen: EntryScreen },
  Search: { screen: SearchScreen },
});

AppRegistry.registerComponent('RecipeBox', () => RecipeBox);
