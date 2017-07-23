/* @flow */
import React, { Component } from 'react';
import { TextInput, ScrollView, Keyboard } from 'react-native';
import EntryScreenBackground from './components/EntryScreenBackground';

export class EntryScreen extends Component<any, Props, void> {
  render() {
    return (
      <EntryScreenBackground>
        <ScrollView
          horizontal
          scrollEnabled={false}
          keyboardShouldPersistTaps="always"
        >
        </ScrollView>
      </EntryScreenBackground>
    );
  }
}

export default EntryScreen;
