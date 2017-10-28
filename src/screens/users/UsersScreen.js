// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import type { Store, State as StoreState } from '../../store/store';
import ImageButton from '../../components/ImageButton';
import menuIcon from '../../images/hamburgerNav.png';

import {
  createUser,
  updatePassword,
  deleteUser,
  getUsers,
} from '../../api/recipe/users';
import UserAdmin from './components/UserAdmin';
import type { User } from '../../api/recipe/model';

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  token: $PropertyType<StoreState, 'token'>,
};
type State = {
  successMessage: string,
  errorMessage: string,
  username: string,
  password: string,
  users: User[],
};
export class UsersScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'User Admin',
    headerLeft: (
      <ImageButton
        icon={menuIcon}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
  });
  state = {
    successMessage: '',
    errorMessage: '',
    username: '',
    password: '',
    users: [],
  };

  handleUsernameChange = (text: string) => {
    this.setState({ username: text });
  };

  handlePasswordChange = (text: string) => {
    this.setState({ password: text });
  };

  handleSavePress = () => {
    const { token } = this.props;

    if (this.state.username !== '' && this.state.password !== '') {
      createUser(token, this.state.username, this.state.password)
        .then(() => {
          this.setState({
            username: '',
            password: '',
            successMessage: 'New user created successfully',
            errorMessage: '',
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    } else {
      this.setState({
        errorMessage: 'Username and password must be populated',
      });
    }
  };

  handleUpdatePress = () => {
    const { token } = this.props;

    if (this.state.username !== '' && this.state.password !== '') {
      updatePassword(token, this.state.username, this.state.password)
        .then(() => {
          this.setState({
            username: '',
            password: '',
            successMessage: 'Password updated successfully',
            errorMessage: '',
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    } else {
      this.setState({
        errorMessage: 'Username and password must be populated',
      });
    }
  };

  handleDeletePress = () => {
    const { token } = this.props;

    if (this.state.username !== '') {
      deleteUser(token, this.state.username)
        .then(() => {
          this.setState({
            username: '',
            password: '',
            successMessage: 'User deleted',
            errorMessage: '',
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    } else {
      this.setState({
        errorMessage: 'Username must be populated',
      });
    }
  };

  handleGetActiveUsersPress = () => {
    const { token } = this.props;

    getUsers(token)
      .then(users => {
        this.setState({ users });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message, successMessage: '' });
      });
  };

  handleClearPress = () => {
    this.setState({
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      users: [],
    });
  };

  render() {
    const userData = this.state.users.map(user => ({
      key: user.id,
      user,
      onUserPress: () => {
        this.setState({
          username: user.username,
          password: '',
          errorMessage: '',
          successMessage: '',
        });
      },
    }));

    return (
      <UserAdmin
        username={this.state.username}
        password={this.state.password}
        onUsernameChange={this.handleUsernameChange}
        onPasswordChange={this.handlePasswordChange}
        onSavePress={this.handleSavePress}
        onUpdatePress={this.handleUpdatePress}
        onDeletePress={this.handleDeletePress}
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        users={userData}
        onSearchUsers={this.handleGetActiveUsersPress}
        onClearPress={this.handleClearPress}
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const UsersNav = StackNavigator({
  Users: {
    screen: connect(mapStateToProps)(UsersScreen),
  },
});

export default UsersNav;
