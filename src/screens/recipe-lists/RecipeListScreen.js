/* @flow */
import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import _ from 'lodash';
import type { Store, State as StoreState } from '../../store/store';
import ImageButton from '../../components/ImageButton';
import menuIcon from '../../images/hamburgerNav.png';
import AllLists from './components/AllLists';
import NewList from './components/NewList';
import {
  createRecipeList,
  deleteRecipeList,
} from '../../api/recipe/recipeLists';
import { setRecipeLists } from '../../store/actions';
import RecipeListDetailsScreen from './RecipeListDetailsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '300',
  },
  successMessage: {
    color: 'green',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '300',
  },
});

type Props = {
  navigation: NavigationScreenProp,
  dispatch: $PropertyType<Store, 'dispatch'>,
  token: $PropertyType<StoreState, 'token'>,
  recipeLists: $PropertyType<StoreState, 'recipeLists'>,
};

type State = {
  newListName: string,
  errorMessage: string,
  successMessage: string,
};

export class RecipeListScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recipe Lists',
    headerLeft: (
      <ImageButton
        icon={menuIcon}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
  });

  state = {
    newListName: '',
    errorMessage: '',
    successMessage: '',
  };

  handleListNameChange = (text: string) => {
    this.setState({ newListName: text });
  };

  handleAddList = () => {
    const { dispatch, token, recipeLists } = this.props;

    if (this.state.newListName !== '') {
      createRecipeList(token, this.state.newListName)
        .then(list => {
          this.setState({
            successMessage: 'Successfully created list',
            errorMessage: '',
            newListName: '',
          });
          const newRecipeLists = _.cloneDeep(recipeLists);
          const newList = { ...list, recipes: [] };
          newRecipeLists.push(newList);
          dispatch(setRecipeLists(newRecipeLists));
        })
        .catch(error => {
          this.setState({
            successMessage: '',
            errorMessage: error,
          });
        });
    } else {
      this.setState({ errorMessage: 'List name cannot be blank' });
    }
  };

  render() {
    const { navigation, dispatch, token, recipeLists } = this.props;
    
    const data = recipeLists.map(recipeList => ({
      key: recipeList.id,
      name: recipeList.name,
      onPress: () => {
        navigation.navigate('RecipeListDetails', {
          recipeList,
        });
      },
      onDeletePress: () => {
        deleteRecipeList(token, recipeList.id)
          .then(() => {
            this.setState({
              successMessage: 'Successfully deleted list',
              errorMessage: '',
            });
            const newRecipeLists = _.filter(
              recipeLists,
              list => list.id !== recipeList.id,
            );
            dispatch(setRecipeLists(newRecipeLists));
          })
          .catch(error => {
            this.setState({
              successMessage: '',
              errorMessage: error,
            });
          });
      },
    }));

    return (
      <ScrollView style={styles.container}>
        <AllLists lists={data} />
        <NewList
          textValue={this.state.newListName}
          onTextChange={this.handleListNameChange}
          onAddList={this.handleAddList}
        />
        <Text style={styles.errorMessage}>
          {this.state.errorMessage}
        </Text>
        <Text style={styles.successMessage}>
          {this.state.successMessage}
        </Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  recipeLists: state.recipeLists,
});

const ListNav = StackNavigator({
  RecipeList: {
    screen: connect(mapStateToProps)(RecipeListScreen),
  },
  RecipeListDetails: {
    screen: RecipeListDetailsScreen,
  },
});

export default ListNav;
