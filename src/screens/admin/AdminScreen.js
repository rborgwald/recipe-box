/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import type { Store } from '../../store/store';
import { setRecipe } from '../../store/actions';

import AddRecipe from './components/AddRecipe';
import type { Recipe } from '../../api/recipe/model';
import { createRecipe } from '../../api/recipe/recipes';

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  recipe: $PropertyType<StoreState, 'recipe'>,
};

type State = {
  errorMessage: string,
};
export class AdminScreen extends Component<any, Props, State> {
  static navigationOptions = {
    title: 'Add Recipes',
  };
  state = {
    errorMessage: '',
  };

  mealTypeRef: ModalDropdown;
  cuisineTypeRef: ModalDropdown;
  preparationTypeRef: ModalDropdown;
  proteinTypeRef: ModalDropdown;

  handleMealTypeRef = (ref: ModalDropdown) => {
    this.mealTypeRef = ref;
  };

  handleCuisineTypeRef = (ref: ModalDropdown) => {
    this.cuisineTypeRef = ref;
  };

  handlePreparationTypeRef = (ref: ModalDropdown) => {
    this.preparationTypeRef = ref;
  };

  handleProteinTypeRef = (ref: ModalDropdown) => {
    this.proteinTypeRef = ref;
  };

  handleNameChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.name = text;
    dispatch(setRecipe(newRecipe));
  };

  handleSourceChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.source = text;
    dispatch(setRecipe(newRecipe));
  };

  handleVolumeChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.volume = text;
    dispatch(setRecipe(newRecipe));
  };

  handlePageChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.page = text;
    dispatch(setRecipe(newRecipe));
  };

  handleMealTypeChange = (idx: string) => {
    const newType = this.props.mealTypes.find(
      type => type.id === parseInt(idx),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe };
    newRecipe.mealType = newType;
    dispatch(setRecipe(newRecipe));
  };

  handleCuisineTypeChange = (idx: string) => {
    const newType = this.props.cuisineTypes.find(
      type => type.id === parseInt(idx),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe };
    newRecipe.cuisineType = newType;
    dispatch(setRecipe(newRecipe));
  };

  handlePreparationTypeChange = (idx: string) => {
    const newType = this.props.preparationTypes.find(
      type => type.id === parseInt(idx),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe };
    newRecipe.preparationType = newType;
    dispatch(setRecipe(newRecipe));
  };

  handleProteinTypeChange = (idx: string) => {
    const newType = this.props.proteinTypes.find(
      type => type.id === parseInt(idx),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe };
    newRecipe.proteinType = newType;
    dispatch(setRecipe(newRecipe));
  };

  handleSaveRecipe = () => {
    const { recipe, dispatch } = this.props;

    console.log('final state: ' + JSON.stringify(recipe));

    createRecipe(recipe).then(response => {
      console.log('Created Recipe: ' + JSON.stringify(response));
      this.setState({ errorMessage: '' });
      this.handleClearRecipe();
    }).catch(error => {
      this.setState({ errorMessage: error.message });
    });

    Keyboard.dismiss();
  };

  handleClearRecipe = () => {
    const { recipe, dispatch } = this.props;
    dispatch(setRecipe({}));

    if (this.mealTypeRef) {
      this.mealTypeRef.select(0);
    }
    if (this.cuisineTypeRef) {
      this.cuisineTypeRef.select(0);
    }
    if (this.preparationTypeRef) {
      this.preparationTypeRef.select(0);
    }
    if (this.proteinTypeRef) {
      this.proteinTypeRef.select(0);
    }

    this.setState({ errorMessage: '' });

    Keyboard.dismiss();
  };

  render() {
    const {
      recipe,
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
    } = this.props;

    const { errorMessage } = this.state;

    const types = [
      {
        name: 'mealTypes',
        values: mealTypes,
        callback: this.handleMealTypeChange,
        ref: this.handleMealTypeRef,
      },
      {
        name: 'cuisineTypes',
        values: cuisineTypes,
        callback: this.handleCuisineTypeChange,
        ref: this.handleCuisineTypeRef,
      },
      {
        name: 'preparationTypes',
        values: preparationTypes,
        callback: this.handlePreparationTypeChange,
        ref: this.handlePreparationTypeRef,
      },
      {
        name: 'proteinTypes',
        values: proteinTypes,
        callback: this.handleProteinTypeChange,
        ref: this.handleProteinTypeRef,
      },
    ];

    return (
      <AddRecipe
        onNameChange={this.handleNameChange}
        onSourceChange={this.handleSourceChange}
        onVolumeChange={this.handleVolumeChange}
        onPageChange={this.handlePageChange}
        types={types}
        onSave={this.handleSaveRecipe}
        onClear={this.handleClearRecipe}
        recipe={recipe}
        errorMessage={errorMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
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
