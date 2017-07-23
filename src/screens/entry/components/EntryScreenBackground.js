// @flow
import React from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { isIos } from '../../../utils/device';
// $FlowIssue
import backgroundImage from '../../../images/recipe_splash-bg.jpg';
// $FlowIssue
import logo from '../../../images/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  strideLogo: {
    flex: isIos() ? 1 : null,
    resizeMode: 'contain',
  },
});

const makeKeyboardWrapper = children =>
  isIos()
    ? <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.strideLogo} source={logo} />
          {children}
        </View>
      </KeyboardAvoidingView>
    : <View style={{ width: '100%', height: '100%' }}>
        <View style={styles.logoContainer}>
          <View style={{ height: '40%', justifyContent: 'center' }}>
            <Image style={styles.strideLogo} source={logo} />
          </View>
          {children}
        </View>
      </View>;

const EntryScreenBackground = ({ children }: { children: React.Element<*> }) =>
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Image source={backgroundImage} style={styles.backgroundImage}>
      {makeKeyboardWrapper(children)}
    </Image>
  </View>;

export default EntryScreenBackground;
