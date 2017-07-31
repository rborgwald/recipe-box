/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Search from './components/Search';
import { getAllRecipes, searchRecipes } from '../../api/recipe/recipes';
import { Recipe } from '../../api/recipe/model';
import RecipeDetailsScreen from '../recipe-details/RecipeDetailsScreen';

type State = {
  searchString: string,
  results: Recipe[],
};
export class SearchScreen extends Component<any, Props, void> {
  static navigationOptions = {
    title: 'Search',
  };

  state = {
    searchString: '',
    results: [],
  };

  handleSearchRecipe = () => {
    const { searchString } = this.state;

    if (searchString.trim() !== '') {
      console.log('Searching for recipe: ' + searchString);
      searchRecipes(searchString).then(recipes => {
        console.log('Matching recipes: ' + JSON.stringify(recipes));
        this.setState({ results: recipes });
      });
    } else {
      this.setState({ results: [] });
    }
    Keyboard.dismiss();
  };

  handleTextChange = (text: string) => {
    this.setState({ searchString: text });
  };

  handleClear = () => {
    this.setState({ searchString: '' });
    this.setState({ results: [] });
    Keyboard.dismiss();
  };

  render() {
    const { navigation } = this.props;
    const data = this.state.results.map(recipe => ({
      key: recipe.id,
      recipe,
      onViewRecipe: () => {
        console.log('in onViewRecipe: ' + recipe.name);
        navigation.navigate('RecipeDetailsScreen', {
          recipe: recipe,
        });
      },
    }));

    return (
      <Search
        onTextChange={this.handleTextChange}
        onSearchRecipe={this.handleSearchRecipe}
        onClearSearch={this.handleClear}
        recipes={data}
        value={this.state.searchString}
      />
    );
  }
}

const RecipeNav = StackNavigator({
  Search: {
    screen: SearchScreen,
  },
  RecipeDetailsScreen: {
    screen: RecipeDetailsScreen,
  }
});

export default RecipeNav;
