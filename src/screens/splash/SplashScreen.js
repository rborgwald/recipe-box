/* @flow */
import React, { Component } from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import SplashScreenBackground from './components/SplashScreenBackground';
import { navigateModalNavigator } from '../../utils/navigation';

type Props = {
  navigation: NavigationScreenProp,
};
export class SplashScreen extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  handleGetStarted = () => {
    const { navigation } = this.props;
    navigation.dispatch(navigateModalNavigator);
  };

  render() {
    return <SplashScreenBackground onPress={this.handleGetStarted} />;
  }
}

export default SplashScreen;
