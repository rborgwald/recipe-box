import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Recipe } from '../../../api/recipe/model';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import TypeDropDown from '../../../components/TypeDropDown';
import { SearchCriterion } from '../../../api/recipe/model';
import BadgeSelector from '../../../components/BadgeSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  badgeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
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
    <View style={styles.infoWrapper}>
      <View style={styles.detailsContainer}>
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
      </View>
      <View style={styles.badgeContainer}>
        <BadgeSelector
          searchCriterion={recipe.mealType}
          backgroundColor="#6b7a8f"
          defaultText="- Meal -"
          onValueChange={onMealTypeChange}
          options={mealTypes}
        />
        <BadgeSelector
          searchCriterion={recipe.cuisineType}
          backgroundColor="#f7882f"
          defaultText="- Cuisine -"
          onValueChange={onCuisineTypeChange}
          options={cuisineTypes}
        />
        <BadgeSelector
          searchCriterion={recipe.preparationType}
          backgroundColor="#f7c331"
          defaultText="- Prep -"
          onValueChange={onPreparationTypeChange}
          options={preparationTypes}
        />
        <BadgeSelector
          searchCriterion={recipe.proteinType}
          backgroundColor="#dcc7aa"
          defaultText="- Protein -"
          onValueChange={onProteinTypeChange}
          options={proteinTypes}
        />
      </View>
    </View>
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