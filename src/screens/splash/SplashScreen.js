/* @flow */
import React, { Component } from 'react';
import SplashScreenBackground from './components/SplashScreenBackground';
import { navigateModalNavigator } from '../../utils/navigation';

export class SplashScreen extends Component<any, Props, void> {
  static navigationOptions = {
    header: null,
  };

  handleGetStarted = () => {
    const { navigation } = this.props;
    navigation.dispatch(navigateModalNavigator);
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SplashScreenBackground
        onPress={this.handleGetStarted}
      />
    );
  }
}

export default SplashScreen;
