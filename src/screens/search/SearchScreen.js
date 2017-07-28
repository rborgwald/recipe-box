/* @flow */
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Search from './components/Search';
import { getAllRecipes } from '../../api/recipe/recipes';

type State = {
  searchString: string,
};
export class SearchScreen extends Component<any, Props, void> {
  static navigationOptions = {
    title: 'Search',
  };

  state = {
    searchString: '',
  };

  handleSearchRecipe = () => {
    const { searchString } = this.state;
    console.log('Searching for recipe: ' + searchString);
    getAllRecipes().then((recipes) => {
      console.log('All recipes: ' + JSON.stringify(recipes));
    });
  };

  handleTextChange = (text: string) => {
    console.log('Search string state change: ' + text);
    this.setState({ searchString: text });
  };

  render() {
    return (
      <Search
        onTextChange={this.handleTextChange}
        onSearchRecipe={this.handleSearchRecipe}
      />
    );
  }
}

export default StackNavigator({
  Search: {
    screen: SearchScreen,
  },
});
