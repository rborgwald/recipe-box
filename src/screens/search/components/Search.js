// @flow
import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import BlockButton from '../../../components/BlockButton';
import {Recipe, SearchCriterion} from '../../../api/recipe/model';
import Divider from '../../../components/Divider';
import RecipePreview from './RecipePreview';
import WordButton from '../../../components/WordButton';
import BadgeSelector from '../../../components/BadgeSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    alignContent: 'center',
  },
  searchInput: {
    height: 40,
    // width: '75%',
    flex: 6,
    borderColor: '#666',
    borderWidth: 1,
    margin: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
  },
  searchButton: {
    width: '100%',
  },
  clearButton: {
    fontSize: 14,
  },
  searchResultsWrapper: {
    margin: 20,
  },
});

const Search = ({
  mealTypes,
  cuisineTypes,
  proteinTypes,
  preparationTypes,
  onTextChange,
  onMealTypeChange,
  onCuisineTypeChange,
  onPreparationTypeChange,
  onProteinTypeChange,
  onSearchRecipe,
  onClearSearch,
  recipes = [],
  value,
  mealType,
}: {
  mealTypes: SearchCriterion[],
  cuisineTypes: SearchCriterion[],
  proteinTypes: SearchCriterion[],
  preparationTypes: SearchCriterion[],
  onTextChange: Function,
  onMealTypeChange: Function,
  onCuisineTypeChange: Function,
  onPreparationTypeChange: Function,
  onProteinTypeChange: Function,
  onSearchRecipe: Function,
  onClearSearch: Function,
  recipes: Recipe[],
  value: string,
  mealType: SearchCriterion,
}) =>
  <View style={styles.container}>
    <View style={styles.searchInputWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter recipe to search"
        value={value}
        autoCorrect={false}
        autoCapitalize="none"
        underlineColorAndroid="rgba(0,0,0,0)"
        onChangeText={onTextChange}
        placeholderTextColor="#666"
        onSubmitEditing={onSearchRecipe}
      />
      <View style={styles.searchButtonContainer}>
        <BlockButton style={styles.searchButton} text="Search" onPress={onSearchRecipe} />
        <WordButton
          style={styles.clearButton}
          text="Clear"
          onPress={onClearSearch}
        />
      </View>
    </View>
    <View style={styles.badgeContainer}>
      <BadgeSelector
        searchCriterion={mealType ? mealType : undefined}
        backgroundColor="#6b7a8f"
        defaultText="Any meal type"
        onValueChange={onMealTypeChange}
        options={mealTypes}
      />
      <BadgeSelector
        backgroundColor="#f7882f"
        defaultText="Any cuisine"
        onValueChange={onCuisineTypeChange}
        options={cuisineTypes}
      />
      <BadgeSelector
        backgroundColor="#f7c331"
        defaultText="Any prep"
        onValueChange={onPreparationTypeChange}
        options={preparationTypes}
      />
      <BadgeSelector
        backgroundColor="#dcc7aa"
        defaultText="Any protein"
        onValueChange={onProteinTypeChange}
        options={proteinTypes}
      />
    </View>
    <View style={styles.searchResultsWrapper}>
      <FlatList
        data={recipes}
        renderItem={({item}) => <RecipePreview {...item} />}
        ItemSeparatorComponent={Divider}
      />
    </View>
  </View>;

export default Search;
