import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Recipe } from '../../../api/recipe/model';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import TypeDropDown from '../../../components/TypeDropDown';
import { SearchCriterion } from '../../../api/recipe/model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  mealTypes,
  cuisineTypes,
  proteinTypes,
  preparationTypes,
  onNameChange,
  onSourceChange,
  onVolumeChange,
  onPageChange,
  onMealTypeChange,
  onCuisineTypeChange,
  onPreparationTypeChange,
  onProteinTypeChange,
  onUpdate,
  onDelete,
}: {
  recipe: Recipe,
  mealTypes: SearchCriterion[],
  cuisineTypes: SearchCriterion[],
  proteinTypes: SearchCriterion[],
  preparationTypes: SearchCriterion[],
  onNameChange: Function,
  onSourceChange: Function,
  onVolumeChange: Function,
  onPageChange: Function,
  onMealTypeChange: Function,
  onCuisineTypeChange: Function,
  onPreparationTypeChange: Function,
  onProteinTypeChange: Function,
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
      options={mealTypes.map(mealType => mealType.description)}
    />
    <TypeDropDown
      title="Cuisine"
      selectedValue={recipe.cuisineType ? recipe.cuisineType.id : null}
      onValueChange={onCuisineTypeChange}
      options={cuisineTypes.map(cuisineType => cuisineType.description)}
    />
    <TypeDropDown
      title="Preparation"
      selectedValue={recipe.preparationType ? recipe.preparationType.id : null}
      onValueChange={onPreparationTypeChange}
      options={preparationTypes.map(preparationType => preparationType.description)}
    />
    <TypeDropDown
      title="Protein"
      selectedValue={recipe.proteinType ? recipe.proteinType.id : null}
      onValueChange={onProteinTypeChange}
      options={proteinTypes.map(proteinType => proteinType.description)}
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
