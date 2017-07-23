// @flow
import React from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Button,
  Alert
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
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 100
  },
  strideLogo: {
    resizeMode: 'contain'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'red'
  }
});

const EntryScreenBackground = ({ onSearchPress }: { onSearchPress: Function }) =>
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Image source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image style={styles.strideLogo} source={logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="red"
          onPress={onSearchPress}
          title="Search Recipes"
        />
      </View>
    </Image>
  </View>;

export default EntryScreenBackground;
