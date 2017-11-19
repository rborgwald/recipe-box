/* @flow */
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import _ from 'lodash';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { Store, State as StoreState } from '../../store/store';
import ImageButton from '../../components/ImageButton';
import RecipeListDetails from './components/RecipeListDetails';
import { setRecipeLists, showModal } from '../../store/actions';
import { store } from '../../store/store';
import RecipeListUserDetails from './components/RecipeListUserDetails';
import {
  addUserToRecipeList,
  getRecipeListsForUser,
  removeUserFromRecipeList,
} from '../../api/recipe/recipeLists';
import type { User } from '../../api/recipe/model';
import { capitalize } from '../../utils/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding: 5,
  },
  successMessage: {
    color: 'green',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding: 5,
  },
});

type State = {
  errorMessage: string,
  successMessage: string,
  selectedUser: User | null,
  refreshing: boolean,
};

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
  token: $PropertyType<StoreState, 'token'>,
  recipeLists: $PropertyType<StoreState, 'recipeLists'>,
  users: $PropertyType<StoreState, 'users'>,
  username: $PropertyType<StoreState, 'username'>,
};

export class RecipeListDetailsScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Recipe List Details',
    headerLeft: (
      <ImageButton onPress={() => navigation.goBack()} icon={backArrow} />
    ),
  });

  state = {
    errorMessage: '',
    successMessage: '',
    recipeList: null,
    selectedUser: null,
    refreshing: false,
  };

  handleAddToList = () => {
    const {
      token,
      dispatch,
      recipeLists,
      navigation: { state: { params: { recipeList } } },
    } = this.props;

    if (this.state.selectedUser !== null) {
      const selectedUser = { ...this.state.selectedUser };
      addUserToRecipeList(token, selectedUser, recipeList)
        .then(() => {
          // Remove user if already exists in recipe list
          const newRecipeList = _.cloneDeep(recipeList);
          newRecipeList.users = _.filter(
            newRecipeList ? newRecipeList.users : [],
            listUser => listUser.id !== selectedUser.id,
          );
          // Add user to newRecipeList
          if (newRecipeList.users) {
            newRecipeList.users.push(selectedUser);
          } else {
            newRecipeList.users = [selectedUser];
          }
          // replace list in recipe lists object
          const newRecipeLists = _.map(
            recipeLists,
            list => (list.id === newRecipeList.id ? newRecipeList : list),
          );
          dispatch(setRecipeLists(newRecipeLists));
          this.setState({
            errorMessage: '',
            successMessage: 'Successfully added user to list',
            selectedUser: null,
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    }
  };

  handleUserChange = (itemValue: string) => {
    const { users } = this.props;
    let selectedUser = null;
    if (parseInt(itemValue, 10) !== 0) {
      selectedUser = users.find(
        user => capitalize(user.username) === capitalize(itemValue),
      );
    }

    this.setState({ selectedUser });
  };

  handleRefresh = () => {
    const { token, dispatch, username } = this.props;
    this.setState({ refreshing: true });
    getRecipeListsForUser(token, username)
      .then(recipeLists => {
        dispatch(setRecipeLists(recipeLists));
        this.setState({
          refreshing: false,
          successMessage: '',
          errorMessage: '',
        });
      })
      .catch(err => {
        this.setState({
          successMessage: '',
          errorMessage: err,
          refreshing: false,
        });
      });
  };

  render() {
    const { token, dispatch, recipeLists, users, username, navigation } = this.props;
    const { navigation: { state: { params: { recipeList } } } } = this.props;
    const { selectedUser } = this.state;

    const currentRecipeList = _.find(
      recipeLists,
      list => list.id === recipeList.id,
    );

    const recipeData = currentRecipeList ? currentRecipeList.recipes.map(recipe => ({
      key: recipe.id,
      recipe,
      currentRecipeList,
      onViewRecipe: () => {
        store.dispatch(
          showModal([
            'RecipeDetailsScreen',
            { recipe, recipeList: currentRecipeList },
          ]),
        );
      },
    })) : [];

    const userData = currentRecipeList ? currentRecipeList.users.map(user => ({
      key: user.id,
      name: user.username,
      onDeletePress: () => {
        removeUserFromRecipeList(token, user, recipeList)
          .then(() => {
            this.setState({
              successMessage: 'Successfully removed user',
              errorMessage: '',
            });
            if (user.username === username) {
              _.remove(recipeLists, list => list.id === recipeList.id);
              const newRecipeLists = _.cloneDeep(recipeLists);

              navigation.goBack();
              dispatch(setRecipeLists(newRecipeLists));
            } else {
              _.remove(currentRecipeList.users, u => user.id === u.id);
              const newRecipeLists = _.filter(
                recipeLists,
                list => list.id !== currentRecipeList.id,
              );
              newRecipeLists.push(currentRecipeList);
              dispatch(setRecipeLists(newRecipeLists));
            }

          })
          .catch(error => {
            this.setState({
              successMessage: '',
              errorMessage: error,
            });
          });
      },
      warningOnDeleteMsg: 'Are you sure you want to remove this user?',
    })) : [];

    return currentRecipeList === undefined
      ? null
      : <View style={styles.container}>
          <RecipeListDetails
            recipeList={currentRecipeList}
            recipes={recipeData}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
          <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>
          <Text style={styles.successMessage}>
            {this.state.successMessage}
          </Text>
          <RecipeListUserDetails
            recipeList={currentRecipeList}
            currentUsers={userData}
            allUsers={users}
            selectedUser={selectedUser}
            onUserChange={this.handleUserChange}
            onAddToList={this.handleAddToList}
          />
        </View>;
  }
}

const mapStateToProps = state => ({
  token: state.token,
  recipeLists: state.recipeLists,
  users: state.users,
  username: state.username,
});

export default connect(mapStateToProps)(RecipeListDetailsScreen);
