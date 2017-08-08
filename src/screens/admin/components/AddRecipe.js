// @flow
import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import BadgeSelector from '../../../components/BadgeSelector';
import { SearchCriterion } from '../../../api/recipe/model';

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
});

const AddRecipe = ({
  onNameChange,
  onSourceChange,
  onVolumeChange,
  onPageChange,
  onMealTypeChange,
  onCusineTypeChange,
  onPreparationTypeChange,
  onProteinTypeChange,
  onSave,
  name,
  source,
  volume,
  page,
  mealTypes,
  cuisineTypes,
  preparationTypes,
  proteinTypes,
}: {
  onNameChange: Function,
  onSourceChange: Function,
  onVolumeChange: Function,
  onPageChange: Function,
  onMealTypeChange: Function,
  onCusineTypeChange: Function,
  onPreparationTypeChange: Function,
  onProteinTypeChange: Function,
  onSave: Function,
  name: string,
  source: string,
  volume: string,
  page: string,
  mealTypes: SearchCriterion[],
  cuisineTypes: SearchCriterion[],
  preparationTypes: SearchCriterion[],
  proteinTypes: SearchCriterion[],
}) =>
  <View style={styles.container}>
    <View style={styles.infoWrapper}>
      <View style={styles.detailsContainer}>
        <TextRowInput onChangeText={onNameChange} headerText="Name" value={name} />
        <TextRowInput onChangeText={onSourceChange} headerText="Source" value={source} />
        <TextRowInput onChangeText={onVolumeChange} headerText="Volume" value={volume} />
        <TextRowInput onChangeText={onPageChange} headerText="Page" value={page} />
      </View>
    </View>
    <View style={styles.badgeContainer}>
      <BadgeSelector
        backgroundColor="#6b7a8f"
        defaultText="- Meal -"
        onValueChange={onMealTypeChange}
        options={mealTypes}
      />
      <BadgeSelector
        backgroundColor="#f7882f"
        defaultText="- Cuisine -"
        onValueChange={onCusineTypeChange}
        options={cuisineTypes}
      />
      <BadgeSelector
        backgroundColor="#f7c331"
        defaultText="- Prep -"
        onValueChange={onPreparationTypeChange}
        options={preparationTypes}
      />
      <BadgeSelector
        backgroundColor="#dcc7aa"
        defaultText="- Protein -"
        onValueChange={onProteinTypeChange}
        options={proteinTypes}
      />
    </View>
    <View style={styles.buttonContainer}>
      <BlockButton style={styles.saveButton} text="Save" onPress={onSave} />
      <BlockButton style={styles.clearButton} text="Clear" onPress={() => {console.log('implement clear')}} />
    </View>
  </View>;

export default AddRecipe;
