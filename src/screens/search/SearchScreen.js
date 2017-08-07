/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import Search from './components/Search';
import { getAllRecipes, searchRecipes } from '../../api/recipe/recipes';
import { Recipe, SearchCriterion } from '../../api/recipe/model';
import RecipeDetailsScreen from '../recipe-details/RecipeDetailsScreen';

type State = {
  searchString: string,
  mealType: SearchCriterion,
  cuisineType: SearchCriterion,
  preparationType: SearchCriterion,
  proteinType: SearchCriterion,
  results: Recipe[],
};
export class SearchScreen extends Component<any, Props, State> {
  static navigationOptions = {
    title: 'Search',
  };

  mealTypeRef: ModalDropdown;
  cuisineTypeRef: ModalDropdown;
  preparationTypeRef: ModalDropdown;
  proteinTypeRef: ModalDropdown;

  state = {
    searchString: '',
    mealType: undefined,
    cuisineType: undefined,
    preparationType: undefined,
    proteinType: undefined,
    results: [],
  };

  handleSearchRecipe = () => {
    const {
      searchString,
      mealType,
      cuisineType,
      preparationType,
      proteinType,
    } = this.state;

    const queryParams = [
      {
        queryParam: 'name',
        value: searchString,
      },
      {
        queryParam: 'mealtype',
        value: mealType ? mealType.name : undefined,
      },
      {
        queryParam: 'cuisinetype',
        value: cuisineType ? cuisineType.name : undefined,
      },
      {
        queryParam: 'preparationtype',
        value: preparationType ? preparationType.name : undefined,
      },
      {
        queryParam: 'proteintype',
        value: proteinType ? proteinType.name : undefined,
      },
    ];

    searchRecipes(queryParams).then(recipes => {
      console.log('Matching recipes: ' + JSON.stringify(recipes));
      this.setState({ results: recipes });
    });
    Keyboard.dismiss();
  };

  handleTextChange = (text: string) => {
    this.setState({ searchString: text });
  };

  handleMealTypeChange = (idx: string) => {
    const newType = this.props.mealTypes.find(
      type => type.id === parseInt(idx),
    );
    this.setState({ mealType: newType });
  };

  handleCuisineTypeChange = (idx: string) => {
    const newType = this.props.cuisineTypes.find(
      type => type.id === parseInt(idx),
    );
    this.setState({ cuisineType: newType });
  };

  handlePreparationTypeChange = (idx: string) => {
    const newType = this.props.preparationTypes.find(
      type => type.id === parseInt(idx),
    );
    this.setState({ preparationType: newType });
  };

  handleProteinTypeChange = (idx: string) => {
    const newType = this.props.proteinTypes.find(
      type => type.id === parseInt(idx),
    );
    this.setState({ proteinType: newType });
  };

  handleClear = () => {
    this.setState({
      searchString: '',
      mealType: undefined,
      cuisineType: undefined,
      preparationType: undefined,
      proteinType: undefined,
      results: [],
    });
    console.log('mealTypeRef: ' + this.mealTypeRef);
    if (this.mealTypeRef) {
      console.log('select(0)');
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

    Keyboard.dismiss();
  };

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

  render() {
    const {
      navigation,
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
    } = this.props;

    const types = [
      {
        name: 'mealTypes',
        values: mealTypes,
        value: this.state.mealType,
        callback: this.handleMealTypeChange,
        ref: this.handleMealTypeRef,
      },
      {
        name: 'cuisineTypes',
        values: cuisineTypes,
        value: this.state.cuisineType,
        callback: this.handleCuisineTypeChange,
        ref: this.handleCuisineTypeRef,
      },
      {
        name: 'preparationTypes',
        values: preparationTypes,
        value: this.state.preparationType,
        callback: this.handlePreparationTypeChange,
        ref: this.handlePreparationTypeRef,
      },
      {
        name: 'proteinTypes',
        values: proteinTypes,
        value: this.state.proteinType,
        callback: this.handleProteinTypeChange,
        ref: this.handleProteinTypeRef,
      },
    ];

    const data = this.state.results.map(recipe => ({
      key: recipe.id,
      recipe,
      onViewRecipe: () => {
        navigation.navigate('RecipeDetailsScreen', {
          recipe: recipe,
        });
      },
    }));

    return (
      <Search
        types={types}
        onTextChange={this.handleTextChange}
        onSearchRecipe={this.handleSearchRecipe}
        onClearSearch={this.handleClear}
        recipes={data}
        textValue={this.state.searchString}
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

const RecipeNav = StackNavigator({
  Search: {
    screen: connect(mapStateToProps)(SearchScreen),
  },
  RecipeDetailsScreen: {
    screen: RecipeDetailsScreen,
  },
});

export default RecipeNav;
