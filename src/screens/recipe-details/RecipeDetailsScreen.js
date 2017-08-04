/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { NavigationScreenProp } from 'react-navigation';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';
import {Recipe, SearchCriterion} from '../../api/recipe/model';
import { updateRecipe } from '../../api/recipe/recipes';

type State = {
  recipe: Recipe,
};
export default class RecipeDetailsScreen extends Component<any, Props, void> {
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

  handleMealTypeChange = (itemValue: string, itemIndex: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;

    recipe.mealType = {};
    recipe.mealType.id = parseInt(itemValue);

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
    if (this.state.recipe) {
      console.log('handle on delete: ' + JSON.stringify(this.state.recipe));
    }
  };

  render() {
    const { navigation: { state: { params: { recipe } } } } = this.props;

    return recipe === undefined
      ? null
      : <RecipeDetails
          recipe={recipe}
          onNameChange={this.handleNameChange}
          onSourceChange={this.handleSourceChange}
          onVolumeChange={this.handleVolumeChange}
          onPageChange={this.handlePageChange}
          onMealTypeChange={this.handleMealTypeChange}
          onUpdate={this.handleOnUpdate}
          onDelete={this.handleOnDelete}
        />;
  }
}
