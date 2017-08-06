/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
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

    console.log('queryParams: ' + JSON.stringify(queryParams));

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
    Keyboard.dismiss();
  };

  render() {
    const {
      navigation,
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
    } = this.props;

    const data = this.state.results.map(recipe => ({
      key: recipe.id,
      recipe,
      onViewRecipe: () => {
        navigation.navigate('RecipeDetailsScreen', {
          recipe: recipe,
        });
      },
    }));

    console.log('state: ' + JSON.stringify(this.state.mealType));

    return (
      <Search
        mealTypes={mealTypes}
        cuisineTypes={cuisineTypes}
        proteinTypes={proteinTypes}
        preparationTypes={preparationTypes}
        onTextChange={this.handleTextChange}
        onMealTypeChange={this.handleMealTypeChange}
        onCuisineTypeChange={this.handleCuisineTypeChange}
        onPreparationTypeChange={this.handlePreparationTypeChange}
        onProteinTypeChange={this.handleProteinTypeChange}
        onSearchRecipe={this.handleSearchRecipe}
        onClearSearch={this.handleClear}
        recipes={data}
        value={this.state.searchString}
        mealType={this.state.mealType}
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
