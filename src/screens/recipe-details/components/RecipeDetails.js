import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Recipe } from '../../../api/recipe/model';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import TypeDropDown from '../../../components/TypeDropDown';

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
  onNameChange,
  onSourceChange,
  onVolumeChange,
  onPageChange,
  onMealTypeChange,
  onUpdate,
  onDelete,
}: {
  recipe: Recipe,
  onNameChange: Function,
  onSourceChange: Function,
  onVolumeChange: Function,
  onPageChange: Function,
  onMealTypeChange: Function,
  onUpdate: Function,
  onDelete: Function,
}) =>
  <View style={styles.container}>
    <TextRowInput
      onChangeText={onNameChange}
      headerText="Name"
      contentText={recipe.name}
    />
    <TextRowInput
      onChangeText={onSourceChange}
      headerText="Source"
      contentText={recipe.source}
    />
    <TextRowInput
      onChangeText={onVolumeChange}
      headerText="Volume"
      contentText={recipe.volume}
    />
    <TextRowInput
      onChangeText={onPageChange}
      headerText="Page"
      contentText={recipe.page ? recipe.page.toString() : ''}
    />
    <TypeDropDown
      title="Meal Type"
      selectedValue={recipe.mealType ? recipe.mealType.id : null}
      onValueChange={onMealTypeChange}
      options={['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']}
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
