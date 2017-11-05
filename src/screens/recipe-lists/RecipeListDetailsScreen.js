/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { Store, State as StoreState } from '../../store/store';
import ImageButton from '../../components/ImageButton';
import RecipeListDetails from './components/RecipeListDetails';
import { showModal } from '../../store/actions';
import { store } from '../../store/store';

type State = {
  errorMessage: string,
};

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
  token: $PropertyType<StoreState, 'token'>,
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
    recipeList: null,
  };

  render() {
    const { navigation: { state: { params: { recipeList } } } } = this.props;

    const recipeData = recipeList.recipes.map(recipe => ({
      key: recipe.id,
      recipe,
      recipeList,
      onViewRecipe: () => {
        store.dispatch(showModal(['RecipeDetailsScreen', { recipe }]));
      },
    }));

    return recipeList === undefined
      ? null
      : <RecipeListDetails recipeList={recipeList} recipes={recipeData} />;
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const RecipeListDetailsNav = StackNavigator({
  RecipeListDetails: {
    screen: connect(mapStateToProps)(RecipeListDetailsScreen),
  },
});

export default RecipeListDetailsNav;
