/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import AddRecipe from './components/AddRecipe';
import type { Recipe } from '../../api/recipe/model';
import { createRecipe } from '../../api/recipe/recipes';

type State = {
  recipe: Recipe,
};
export class AdminScreen extends Component<any, Props, State> {
  static navigationOptions = {
    title: 'Add Recipes',
  };

  state = {
    recipe: {},
  };

  handleNameChange = (text: string) => {
    const newRecipe: Recipe = { ...this.state.recipe };
    newRecipe.name = text;
    this.setState({ recipe: newRecipe });
  };

  handleSourceChange = (text: string) => {
    const newRecipe: Recipe = { ...this.state.recipe };
    newRecipe.source = text;
    this.setState({ recipe: newRecipe });
  };

  handleVolumeChange = (text: string) => {
    const newRecipe: Recipe = { ...this.state.recipe };
    newRecipe.volume = text;
    this.setState({ recipe: newRecipe });
  };

  handlePageChange = (text: string) => {
    const newRecipe: Recipe = { ...this.state.recipe };
    newRecipe.page = text;
    this.setState({ recipe: newRecipe });
  };

  handleMealTypeChange = (idx: string) => {
    const newType = this.props.mealTypes.find(
      type => type.id === parseInt(idx),
    );

    const newRecipe = { ...this.state.recipe };
    newRecipe.mealType = newType;
    this.setState({ recipe: newRecipe });
  };

  handleCuisineTypeChange = (idx: string) => {
    const newType = this.props.cuisineTypes.find(
      type => type.id === parseInt(idx),
    );

    const newRecipe = { ...this.state.recipe };
    newRecipe.cuisineType = newType;
    this.setState({ recipe: newRecipe });
  };

  handlePreparationTypeChange = (idx: string) => {
    const newType = this.props.preparationTypes.find(
      type => type.id === parseInt(idx),
    );

    const newRecipe = { ...this.state.recipe };
    newRecipe.preparationType = newType;
    this.setState({ recipe: newRecipe });
  };

  handleProteinTypeChange = (idx: string) => {
    const newType = this.props.proteinTypes.find(
      type => type.id === parseInt(idx),
    );

    const newRecipe = { ...this.state.recipe };
    newRecipe.proteinType = newType;
    this.setState({ recipe: newRecipe });
  };

  handleSaveRecipe = () => {
    const { recipe } = this.state;

    console.log('final state: ' + JSON.stringify(recipe));

    createRecipe(recipe).then(response => {
      console.log('Created Recipe: ' + JSON.stringify(response));
      this.setState({ recipe: {} });
    });

    Keyboard.dismiss();
  };

  render() {
    const {
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
    } = this.props;

    return (
      <AddRecipe
        onNameChange={this.handleNameChange}
        onSourceChange={this.handleSourceChange}
        onVolumeChange={this.handleVolumeChange}
        onPageChange={this.handlePageChange}
        onMealTypeChange={this.handleMealTypeChange}
        onCusineTypeChange={this.handleCuisineTypeChange}
        onPreparationTypeChange={this.handlePreparationTypeChange}
        onProteinTypeChange={this.handleProteinTypeChange}
        onSave={this.handleSaveRecipe}
        name={this.state.recipe.name}
        source={this.state.recipe.source}
        volume={this.state.recipe.volume}
        page={this.state.recipe.page}
        mealTypes={mealTypes}
        cuisineTypes={cuisineTypes}
        preparationTypes={preparationTypes}
        proteinTypes={proteinTypes}
      />
    );
  }
}

const mapStateToProps = state => ({
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
});

const AdminNav = StackNavigator({
  Admin: {
    screen: connect(mapStateToProps)(AdminScreen),
  },
});

export default AdminNav;
