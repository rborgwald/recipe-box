import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Recipe } from '../../../api/recipe/model';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  updateButton: {
    backgroundColor: 'green',
    margin: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    margin: 5,
  },
});

const RecipeDetails = ({
  recipe,
  onUpdate,
  onDelete,
}: {
  recipe: Recipe,
  onUpdate: Function,
  onDelete: Function,
}) =>
  <View style={styles.container}>
    <TextRowInput headerText="Name" contentText={recipe.name} />
    <TextRowInput headerText="Source" contentText={recipe.source} />
    <TextRowInput headerText="Volume" contentText={recipe.volume} />
    <TextRowInput
      headerText="Page"
      contentText={recipe.page ? recipe.page.toString() : ''}
    />
    <View style={styles.buttonContainer}>
      <BlockButton
        style={styles.updateButton}
        text="Update"
        onPress={onUpdate}
      />
      <BlockButton
        style={styles.deleteButton}
        text="Delete"
        onPress={onDelete}
      />
    </View>
  </View>;

export default RecipeDetails;
