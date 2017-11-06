/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import _ from 'lodash';
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
  recipeLists: $PropertyType<StoreState, 'recipeLists'>,
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
    const { recipeLists } = this.props;
    const { navigation: { state: { params: { recipeList } } } } = this.props;
    const currentRecipeList = _.find(
      recipeLists,
      list => list.id === recipeList.id,
    );
    const recipeData = currentRecipeList.recipes.map(recipe => ({
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
    }));

    return currentRecipeList === undefined
      ? null
      : <RecipeListDetails
          recipeList={currentRecipeList}
          recipes={recipeData}
        />;
  }
}

const mapStateToProps = state => ({
  token: state.token,
  recipeLists: state.recipeLists,
});

export default connect(mapStateToProps)(RecipeListDetailsScreen);
