// @flow
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavHeaderTitle from '../../components/NavHeaderTitle';
import type { NavigationScreenProp } from 'react-navigation';
import type { Store, State as StoreState } from 'store/store';
import { connect } from 'react-redux';
// $FlowIssue
import homeIcon from '../../images/tab_home-icon.png';
import Dashboard from './components/Dashboard';

const styles = StyleSheet.create({

});

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
};
export class DashboardScreen extends Component<any, Props, void> {
  static navigationOptions = {
    headerTitle: <NavHeaderTitle>Dashboard</NavHeaderTitle>,
    headerStyle: { backgroundColor: '#fff' },
    tabBarIcon: ({ tintColor }) =>
      <Image style={[styles.homeIcon, { tintColor }]} source={homeIcon} />,
  };

  render() {
    return (
      <Dashboard
      />
    );
  }
}

const mapStateToProps = state => ({
});

export default StackNavigator({
  DashboardScreen: {
    screen: connect(mapStateToProps)(DashboardScreen),
  },
});
