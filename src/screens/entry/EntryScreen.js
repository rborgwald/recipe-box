/* @flow */
import React, { Component } from 'react';
import EntryScreenBackground from './components/EntryScreenBackground';

export class EntryScreen extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <EntryScreenBackground
        onSearchPress={() => navigate('Search')}
      />
    );
  }
}

export default EntryScreen;
