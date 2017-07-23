/* @flow */
import React, { Component } from 'react';
import { TextInput, ScrollView, Keyboard } from 'react-native';
import Search from './components/Search';

export class SearchScreen extends Component<any, Props, void> {
  static navigationOptions = {
    title: 'Search Recipes'
  };

  render() {
    return (
      <Search>
      </Search>
    );
  }
}

export default SearchScreen;
