/* @flow */
import React, { Component } from 'react';
import { TextInput, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import type { State as StoreState, Store } from 'store/store';
import type { NavigationScreenProp } from 'react-navigation';
import EntryScreenBackground from './components/EntryScreenBackground';

export class EntryScreen extends Component<any, Props, State> {
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

const mapStateToProps = state => ({
  userId: state.userId,
});

export default connect(mapStateToProps)(EntryScreen);
