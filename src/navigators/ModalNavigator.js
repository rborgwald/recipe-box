/* @flow */
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeNavigator from './HomeNavigator';
import { connect } from 'react-redux';
import { navigateEntryScreen } from '../utils/navigation';

import type { State } from 'store/store';
import type { NavigationScreenProp } from 'react-navigation';

export const ModalNav = StackNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator,
    },
  },
  {
    mode: 'modal',
  },
);

type Props = {
  navigation: NavigationScreenProp,
};
export class ModalNavWrapper extends Component<any, Props, void> {
  componentWillReceiveProps(nextProps: Props) {
    const { navigation } = this.props;
  }

  render() {
    return <ModalNav />;
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ModalNavWrapper);
