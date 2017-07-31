/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { NavigationScreenProp } from 'react-navigation';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';
import { Recipe } from '../../api/recipe/model';

type State = {
  recipe: Recipe,
};
export default class RecipeDetailsScreen extends Component<any, Props, void> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Recipe Details',
    headerLeft: (
      <ImageButton
        onPress={() => navigation.goBack()}
        icon={backArrow}
      />
    ),
  });

  state = {
    recipe: undefined,
  };

  render() {
    const {
      navigation: { state: { params: { recipe } } },
    } = this.props;

    return recipe === undefined
      ? null
      : <RecipeDetails
        recipe={recipe}
        onUpdate={() => {}}
        onDelete={() => {}}
      />;
  }
}
