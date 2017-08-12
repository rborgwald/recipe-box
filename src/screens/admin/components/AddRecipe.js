// @flow
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import BadgeSelector from '../../../components/BadgeSelector';
import { SearchCriterion, Recipe } from '../../../api/recipe/model';

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  saveButton: {
    backgroundColor: 'green',
    margin: 5,
  },
  clearButton: {
    backgroundColor: 'red',
    margin: 5,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
  },
});

const AddRecipe = ({
  onNameChange,
  onSourceChange,
  onVolumeChange,
  onPageChange,
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
  onSave: Function,
  onClear: Function,
  recipe: Recipe,
  types: [
    {
      name: string,
      values: SearchCriterion[],
      callback: Function,
      ref: ModalDropdown,
    },
  ],
  errorMessage: string,
}) =>
  <ScrollView style={styles.container}>
    <View style={styles.infoWrapper}>
      <View style={styles.detailsContainer}>
        <TextRowInput
          onChangeText={onNameChange}
          headerText="Name"
          contentText={recipe ? recipe.name : ''}
        />
        <TextRowInput
          onChangeText={onSourceChange}
          headerText="Source"
          contentText={recipe ? recipe.source : ''}
        />
        <TextRowInput
          onChangeText={onVolumeChange}
          headerText="Volume"
          contentText={recipe ? recipe.volume : ''}
        />
        <TextRowInput
          onChangeText={onPageChange}
          headerText="Page"
          contentText={recipe ? recipe.page : ''}
        />
      </View>
    </View>
    <View style={styles.badgeContainer}>
      <BadgeSelector
        childRef={types.find(type => type.name === 'mealTypes').ref}
        backgroundColor="#6b7a8f"
        defaultText="- Meal -"
        onValueChange={types.find(type => type.name === 'mealTypes').callback}
        options={types.find(type => type.name === 'mealTypes').values}
      />
      <BadgeSelector
        childRef={types.find(type => type.name === 'cuisineTypes').ref}
        backgroundColor="#f7882f"
        defaultText="- Cuisine -"
        onValueChange={
          types.find(type => type.name === 'cuisineTypes').callback
        }
        options={types.find(type => type.name === 'cuisineTypes').values}
      />
      <BadgeSelector
        childRef={types.find(type => type.name === 'preparationTypes').ref}
        backgroundColor="#f7c331"
        defaultText="- Prep -"
        onValueChange={
          types.find(type => type.name === 'preparationTypes').callback
        }
        options={types.find(type => type.name === 'preparationTypes').values}
      />
      <BadgeSelector
        childRef={types.find(type => type.name === 'proteinTypes').ref}
        backgroundColor="#dcc7aa"
        defaultText="- Protein -"
        onValueChange={
          types.find(type => type.name === 'proteinTypes').callback
        }
        options={types.find(type => type.name === 'proteinTypes').values}
      />
    </View>
    <View style={styles.buttonContainer}>
      <BlockButton
        style={styles.saveButton}
        text="Save"
        onPress={onSave}
        disabled={!recipe.name || !recipe.source}
      />
      <BlockButton style={styles.clearButton} text="Clear" onPress={onClear} />
    </View>
    <Text style={styles.errorMessage}>
      {errorMessage}
    </Text>
  </ScrollView>;

export default AddRecipe;
