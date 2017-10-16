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
  ScrollView,
  Text,
  TextInput,
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
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    margin: 10,
  },
  loginButton: {
    fontWeight: '300',
    fontSize: 28,
  },
  textInput: {
    height: 40,
    width: 160,
    backgroundColor: '#E8C8AF',
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: '400',
    color: 'red',
  },
});

const Login = ({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  message,
  onPress,
}: {
  username: string,
  onUsernameChange: Function,
  password: string,
  onPasswordChange: Function,
  message: string,
  onPress: Function,
}) =>
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Image source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image style={styles.strideLogo} source={logo} />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.errorMessage} >{message}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          value={username}
          onChangeText={onUsernameChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={onPasswordChange}
          onSubmitEditing={onPress}
        />
        <View style={styles.buttonContainer}>
          <WordButton
            style={styles.loginButton}
            text="Login"
            onPress={onPress}
          />
        </View>
      </View>
    </Image>
  </View>;

export default Login;
