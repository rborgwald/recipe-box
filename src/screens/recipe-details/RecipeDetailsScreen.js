/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import type { NavigationScreenProp } from 'react-navigation';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { Store, State as StoreState } from '../../store/store';
import { setRecipes } from '../../store/actions';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';
import { updateRecipe, deleteRecipe } from '../../api/recipe/recipes';
import type { Recipe } from '../../api/recipe/model';

type State = {
  errorMessage: string,
  recipe: Recipe | null,
};

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
  recipes: $PropertyType<StoreState, 'recipes'>,
  mealTypes: $PropertyType<StoreState, 'mealTypes'>,
  cuisineTypes: $PropertyType<StoreState, 'cuisineTypes'>,
  preparationTypes: $PropertyType<StoreState, 'preparationTypes'>,
  proteinTypes: $PropertyType<StoreState, 'proteinTypes'>,
};
export class RecipeDetailsScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Recipe Details',
    headerLeft: (
      <ImageButton onPress={() => navigation.goBack()} icon={backArrow} />
    ),
  });

  state = {
    errorMessage: '',
    recipe: null,
  };

  handleNameChange = (newName: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.name = newName;
    this.setState({ recipe });
  };

  handleSourceChange = (newSource: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.source = newSource;
    this.setState({ recipe });
  };

  handleVolumeChange = (newVolume: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.volume = newVolume;
    this.setState({ recipe });
  };

  handlePageChange = (newPage: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.page = newPage;
    this.setState({ recipe });
  };

  handleNewRecipeCheckedChange = (checked: boolean) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.newRecipe = !checked;
    this.setState({ recipe });
  };

  handleTriedItRecipeCheckedChange = (checked: boolean) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.newRecipe = checked;
    this.setState({ recipe });
  };

  handleRatingChange = (itemSelected: number) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.stars = itemSelected;
    this.setState({ recipe });
  };

  handleMealTypeChange = (itemValue: string) => {
    const {
      mealTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.mealType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.mealType = {};
      const newType = mealTypes.find(type => type.idx === selectedIdx);
      recipe.mealType = newType;
    }
    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleCuisineTypeChange = (itemValue: string) => {
    const {
      cuisineTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.cuisineType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.cuisineType = {};
      const newType = cuisineTypes.find(type => type.idx === selectedIdx);
      recipe.cuisineType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handlePreparationTypeChange = (itemValue: string) => {
    const {
      preparationTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.preparationType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.preparationType = {};
      const newType = preparationTypes.find(type => type.idx === selectedIdx);
      recipe.preparationType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleProteinTypeChange = (itemValue: string) => {
    const {
      proteinTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.proteinType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.proteinType = {};
      const newType = proteinTypes.find(type => type.idx === selectedIdx);
      recipe.proteinType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleOnUpdate = () => {
    const {
      recipes,
      dispatch,
      navigation: { state: { params: { recipe } } },
    } = this.props;
    if (recipe) {
      updateRecipe(recipe)
        .then(() => {
          const newRecipes = filter(recipes, rec => rec.id !== recipe.id);
          newRecipes.push(recipe);
          dispatch(setRecipes(newRecipes));

          const { navigation } = this.props;
          navigation.goBack();
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
        });
    }
  };

  handleOnDelete = () => {
    const {
      recipes,
      dispatch,
      navigation: { state: { params: { recipe } } },
    } = this.props;
    if (recipe) {
      deleteRecipe(recipe)
        .then(() => {
          const newRecipes = filter(recipes, rec => rec.id !== recipe.id);
          dispatch(setRecipes(newRecipes));

          const { navigation } = this.props;
          navigation.goBack();
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
        });
    }
  };

  render() {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    const { errorMessage } = this.state;

    return recipe === undefined
      ? null
      : <RecipeDetails
          recipe={recipe}
          mealTypes={this.props.mealTypes}
          cuisineTypes={this.props.cuisineTypes}
          proteinTypes={this.props.proteinTypes}
          preparationTypes={this.props.preparationTypes}
          onNameChange={this.handleNameChange}
          onSourceChange={this.handleSourceChange}
          onVolumeChange={this.handleVolumeChange}
          onPageChange={this.handlePageChange}
          onNewRecipeCheckedChange={this.handleNewRecipeCheckedChange}
          onTriedItCheckedChange={this.handleTriedItRecipeCheckedChange}
          onRatingChange={this.handleRatingChange}
          onMealTypeChange={this.handleMealTypeChange}
          onCuisineTypeChange={this.handleCuisineTypeChange}
          onPreparationTypeChange={this.handlePreparationTypeChange}
          onProteinTypeChange={this.handleProteinTypeChange}
          onUpdate={this.handleOnUpdate}
          onDelete={this.handleOnDelete}
          errorMessage={errorMessage}
        />;
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
});

export default connect(mapStateToProps)(RecipeDetailsScreen);
