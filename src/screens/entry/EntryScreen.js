/* @flow */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import SplashBackground from './components/SplashBackground';
import Login from './components/Login';
import { navigateModalNavigator } from '../../utils/navigation';
import type { Store, State as StoreState } from '../../store/store';
import { login } from '../../api/recipe/login';
import {setLogin, setLogout, setToken, setUser} from '../../store/actions';
import { deleteToken, readAll, saveToken, saveUser } from '../../utils/storage';

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
  isLoggedIn: $PropertyType<StoreState, 'isLoggedIn'>,
  username: $PropertyType<StoreState, 'username'>,
};
type State = {
  username: string,
  password: string,
  errorMsg: string,
};
export class EntryScreen extends Component<any, Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    password: '',
    errorMsg: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    readAll().then(({ username, token }) => {
      if (token && username) {
        dispatch(setToken(token));
        dispatch(setLogin(username));
        this.setState({ username });
      } else if(username) {
        dispatch(setUser(username));
        this.setState({ username });
      }

    });
  }

  handleGetStarted = () => {
    const { navigation } = this.props;
    navigation.dispatch(navigateModalNavigator);
  };

  handleUsernameChange = (text: string) => {
    this.setState({ username: text });
  };

  handlePasswordChange = (text: string) => {
    this.setState({ password: text });
  };

  handleLogin = (event: any) => {
    if (!this.state.password) return Promise.resolve('no password entered');

    return saveUser(this.state.username)
      .then(() => login(this.state.username, this.state.password))
      .then(token => {
        const { dispatch, navigation } = this.props;
        dispatch(setLogin(this.state.username));
        dispatch(setToken(token));
        this.setState({
          errorMsg: '',
          password: '',
        });
        saveToken(token.toString());
        navigation.dispatch(navigateModalNavigator);
      })
      .catch(err => {
        // set credentials to null, token to null, and isLoggedIn = false
        console.log(`${err}`);
        const { dispatch } = this.props;
        this.setState({
          errorMsg: err.message,
          password: '',
        });
        dispatch(setLogout());
        deleteToken();
      });
  };

  render() {
    if (this.props.isLoggedIn) {
      return <SplashBackground onPress={this.handleGetStarted} />;
    } else {
      return (
        <Login
          username={this.state.username}
          onUsernameChange={this.handleUsernameChange}
          password={this.state.password}
          onPasswordChange={this.handlePasswordChange}
          message={this.state.errorMsg}
          onPress={this.handleLogin}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  username: state.username,
});

export default connect(mapStateToProps)(EntryScreen);
