// @flow
import React from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';
import WordButton from '../../../components/WordButton';
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
  touchhighlight: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  strideLogo: {
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: '300',
    fontSize: 28,
  }
});

const SplashScreenBackground = ({ onPress }: { onPress: Function }) =>
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
      <Image source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image style={styles.strideLogo} source={logo} />
        </View>
        <View style={styles.buttonContainer}>
          <WordButton style={styles.buttonText} text="Get Started" onPress={onPress} />
        </View>
      </Image>
  </View>;

export default SplashScreenBackground;
