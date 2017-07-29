import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Recipe } from '../../../api/recipe/model';

const styles = StyleSheet.create({
  container: {},
});

const RecipePreview = ({
  recipe,
}: {
  recipe: Recipe,
}) =>
  <View style={styles.container}>
    <Text>{recipe.name}</Text>
  </View>;

export default RecipePreview;
