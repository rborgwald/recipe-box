/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { NavigationScreenProp } from 'react-navigation';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';
import { Recipe, SearchCriterion } from '../../api/recipe/model';
import { updateRecipe, deleteRecipe } from '../../api/recipe/recipes';

type State = {
  recipe: Recipe,
};
export class RecipeDetailsScreen extends Component<any, Props, void> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Recipe Details',
    headerLeft: (
      <ImageButton onPress={() => navigation.goBack()} icon={backArrow} />
    ),
  });

  state = {
    recipe: undefined,
  };

  handleNameChange = (newName: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.name = newName;
    this.setState({ recipe: recipe });
  };

  handleSourceChange = (newSource: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.source = newSource;
    this.setState({ recipe: recipe });
  };

  handleVolumeChange = (newVolume: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.volume = newVolume;
    this.setState({ recipe: recipe });
  };

  handlePageChange = (newPage: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.page = newPage;
    this.setState({ recipe: recipe });
  };

  handleMealTypeChange = (itemValue: string, itemIndex?: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;

    recipe.mealType = null;
    if (parseInt(itemValue) !== 0) {
      recipe.mealType = {};
      recipe.mealType.id = parseInt(itemValue);
    }
    console.log('recipe: ' + JSON.stringify(recipe));
    this.setState({ recipe: recipe });
  };

  handleCuisineTypeChange = (itemValue: string, itemIndex: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;

    recipe.cuisineType = null;
    if (parseInt(itemValue) !== 0) {
      recipe.cuisineType = {};
      recipe.cuisineType.id = parseInt(itemValue);
    }

    this.setState({ recipe: recipe });
  };

  handlePreparationTypeChange = (itemValue: string, itemIndex: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;

    recipe.preparationType = null;
    if (parseInt(itemValue) !== 0) {
      recipe.preparationType = {};
      recipe.preparationType.id = parseInt(itemValue);
    }

    this.setState({ recipe: recipe });
  };

  handleProteinTypeChange = (itemValue: string, itemIndex: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;

    recipe.proteinType = null;
    if (parseInt(itemValue) !== 0) {
      recipe.proteinType = {};
      recipe.proteinType.id = parseInt(itemValue);
    }

    this.setState({ recipe: recipe });
  };

  handleOnUpdate = () => {
    if (this.state.recipe) {
      updateRecipe(this.state.recipe).then(() => {});
    }
    const { navigation } = this.props;
    navigation.goBack();
  };

  handleOnDelete = () => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    if (recipe) {
      deleteRecipe(recipe).then(() => {});
    }
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { navigation: { state: { params: { recipe } } } } = this.props;

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
          onMealTypeChange={this.handleMealTypeChange}
          onCuisineTypeChange={this.handleCuisineTypeChange}
          onPreparationTypeChange={this.handlePreparationTypeChange}
          onProteinTypeChange={this.handleProteinTypeChange}
          onUpdate={this.handleOnUpdate}
          onDelete={this.handleOnDelete}
        />;
  }
}

const mapStateToProps = state => ({
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
});

export default connect(mapStateToProps)(RecipeDetailsScreen);
