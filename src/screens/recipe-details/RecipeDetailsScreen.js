/* @flow */
import React, { Component } from 'react';
// $FlowIssue
import backArrow from '../../images/back.png';
import type { NavigationScreenProp } from 'react-navigation';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';

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

  render() {
    const {
      navigation: { state: { params: { recipeName } } },
      recipe
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
