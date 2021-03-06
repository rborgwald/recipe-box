// @flow
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-checkbox';
import type { State as StoreState } from '../../../store/store';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import BadgeSelector from '../../../components/BadgeSelector';
import type { SearchCriterion } from '../../../api/recipe/model';
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
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
  saveButton: {
    backgroundColor: '#29a709',
    margin: 5,
  },
  clearButton: {
    backgroundColor: '#e24949',
    margin: 5,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
  },
});

export const getRefFromTypes = (
  types: Array<any>,
  typeName: string,
): ModalDropdown => {
  const type = types.find(element => element.name === typeName);
  return type ? type.ref : undefined;
};

export const getCallbackFromTypes = (
  types: Array<any>,
  typeName: string,
): Function => {
  const type = types.find(element => element.name === typeName);
  return type ? type.callback : () => {};
};

export const getOptionsFromTypes = (
  types: Array<any>,
  typeName: string,
): SearchCriterion[] => {
  const type = types.find(element => element.name === typeName);
  return type ? type.values : [];
};

const AddRecipe = ({
  onNameChange,
  onSourceChange,
  onVolumeChange,
  onPageChange,
  onNewRecipeCheckedChange,
  onTriedItCheckedChange,
  onRatingChange,
  onSave,
  onClear,
  recipe,
  types,
  errorMessage,
}: {
  onNameChange: Function,
  onSourceChange: Function,
  onVolumeChange: Function,
  onPageChange: Function,
  onNewRecipeCheckedChange: Function,
  onTriedItCheckedChange: Function,
  onRatingChange: Function,
  onSave: Function,
  onClear: Function,
  recipe: $PropertyType<StoreState, 'recipe'>,
  types: Array<any>,
  errorMessage: string,
}) =>
  <ScrollView style={styles.container}>
    <View style={styles.infoWrapper}>
      <View style={styles.detailsContainer}>
        <TextRowInput
          autoCapitalize="words"
          onChangeText={onNameChange}
          headerText="Name"
          contentText={recipe ? recipe.name : ''}
        />
        <TextRowInput
          autoCapitalize="words"
          onChangeText={onSourceChange}
          headerText="Source"
          contentText={recipe ? recipe.source : ''}
        />
        <TextRowInput
          autoCapitalize="words"
          onChangeText={onVolumeChange}
          headerText="Volume"
          contentText={recipe ? recipe.volume : ''}
        />
        <TextRowInput
          onChangeText={onPageChange}
          headerText="Page"
          contentText={recipe ? recipe.page : ''}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            label="New"
            checked={recipe && recipe.newRecipe !== undefined ? recipe.newRecipe : true}
            onChange={onNewRecipeCheckedChange}
          />
          <CheckBox
            label="Tried It"
            checked={recipe && recipe.newRecipe !== undefined ? !recipe.newRecipe : false}
            onChange={onTriedItCheckedChange}
          />
        </View>
        <Ratings
          maxRating={3}
          rating={recipe && recipe.stars ? recipe.stars : 0}
          onRatingChange={onRatingChange}
        />
      </View>
      <View style={styles.badgeContainer}>
        <BadgeSelector
          childRef={getRefFromTypes(types, 'mealTypes')}
          backgroundColor="#6b7a8f"
          defaultText="- Meal -"
          onValueChange={getCallbackFromTypes(types, 'mealTypes')}
          options={getOptionsFromTypes(types, 'mealTypes')}
        />
        <BadgeSelector
          childRef={getRefFromTypes(types, 'cuisineTypes')}
          backgroundColor="#f7882f"
          defaultText="- Cuisine -"
          onValueChange={getCallbackFromTypes(types, 'cuisineTypes')}
          options={getOptionsFromTypes(types, 'cuisineTypes')}
        />
        <BadgeSelector
          childRef={getRefFromTypes(types, 'preparationTypes')}
          backgroundColor="#f7c331"
          defaultText="- Prep -"
          onValueChange={getCallbackFromTypes(types, 'preparationTypes')}
          options={getOptionsFromTypes(types, 'preparationTypes')}
        />
        <BadgeSelector
          childRef={getRefFromTypes(types, 'proteinTypes')}
          backgroundColor="#dcc7aa"
          defaultText="- Protein -"
          onValueChange={getCallbackFromTypes(types, 'proteinTypes')}
          options={getOptionsFromTypes(types, 'proteinTypes')}
        />
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <BlockButton
        style={styles.saveButton}
        text="Save"
        onPress={onSave}
        disabled={recipe ? !recipe.name || !recipe.source : true}
      />
      <BlockButton style={styles.clearButton} text="Clear" onPress={onClear} />
    </View>
    <Text style={styles.errorMessage}>
      {errorMessage}
    </Text>
  </ScrollView>;

export default AddRecipe;
