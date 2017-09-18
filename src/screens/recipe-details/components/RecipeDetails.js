// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-checkbox';
import type { Recipe, SearchCriterion } from '../../../api/recipe/model';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import BadgeSelector from '../../../components/BadgeSelector';
import Ratings from '../../../components/Ratings';

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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
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
    marginTop: 0,
  },
  updateButton: {
    backgroundColor: '#29a709',
    margin: 5,
    marginTop: 0,
  },
  deleteButton: {
    backgroundColor: '#e24949',
    margin: 5,
    marginTop: 0,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
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
  onNewRecipeCheckedChange,
  onTriedItCheckedChange,
  onRatingChange,
  onMealTypeChange,
  onCuisineTypeChange,
  onPreparationTypeChange,
  onProteinTypeChange,
  onUpdate,
  onDelete,
  errorMessage,
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
  onNewRecipeCheckedChange: Function,
  onTriedItCheckedChange: Function,
  onRatingChange: Function,
  onMealTypeChange: Function,
  onCuisineTypeChange: Function,
  onPreparationTypeChange: Function,
  onProteinTypeChange: Function,
  onUpdate: Function,
  onDelete: Function,
  errorMessage: string,
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
        <View style={styles.checkboxContainer}>
          <CheckBox
            label="New"
            checked={recipe.newRecipe}
            onChange={onNewRecipeCheckedChange}
          />
          <CheckBox
            label="Tried It"
            checked={!(recipe.newRecipe)}
            onChange={onTriedItCheckedChange}
          />
        </View>
        <Ratings
          maxRating={3}
          rating={recipe.stars ? recipe.stars : 0}
          onRatingChange={onRatingChange}
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
    <Text style={styles.errorMessage}>
      {errorMessage}
    </Text>
  </View>;

export default RecipeDetails;
