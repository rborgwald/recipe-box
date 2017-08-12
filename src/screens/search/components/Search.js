// @flow
import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import BlockButton from '../../../components/BlockButton';
import { Recipe, SearchCriterion } from '../../../api/recipe/model';
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
    margin: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    alignContent: 'center',
  },
  searchInput: {
    height: 40,
    flex: 6,
    borderColor: '#666',
    borderWidth: 1,
    margin: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  searchButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '25%',
  },
  searchButton: {
    width: '100%',
  },
  clearButtonContainer: {
    width: '100%',
  },
  clearButton: {
    fontSize: 16,
    textAlign: 'right',
    marginRight: 45,
  },
  searchResultsWrapper: {
    margin: 10,
    marginTop: 0,
    marginBottom: 165,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
  },
});

const Search = ({
  types,
  onTextChange,
  onSearchRecipe,
  onClearSearch,
  recipes = [],
  textValue,
  errorMessage,
}: {
  types: [
    {
      name: string,
      values: SearchCriterion[],
      value: SearchCriterion,
      callback: Function,
      ref: ModalDropdown,
    },
  ],
  onTextChange: Function,
  onSearchRecipe: Function,
  onClearSearch: Function,
  recipes: Recipe[],
  textValue: string,
  errorMessage: string,
}) =>
  <View style={styles.container}>
    <View style={styles.searchInputWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter recipe to search"
        value={textValue}
        autoCorrect={false}
        autoCapitalize="none"
        underlineColorAndroid="rgba(0,0,0,0)"
        onChangeText={onTextChange}
        placeholderTextColor="#666"
        onSubmitEditing={onSearchRecipe}
      />
      <View style={styles.searchButtonContainer}>
        <BlockButton
          style={styles.searchButton}
          text="Search"
          onPress={onSearchRecipe}
        />
      </View>
    </View>
    <View style={styles.clearButtonContainer}>
      <WordButton
        style={styles.clearButton}
        text="Clear"
        onPress={onClearSearch}
      />
    </View>
    <View style={styles.badgeContainer}>
      <BadgeSelector
        childRef={types.find(type => type.name === 'mealTypes').ref}
        searchCriterion={
          types.find(type => type.name === 'mealTypes').value || undefined
        }
        backgroundColor="#6b7a8f"
        defaultText="Any meal type"
        onValueChange={types.find(type => type.name === 'mealTypes').callback}
        options={types.find(type => type.name === 'mealTypes').values}
      />
      <BadgeSelector
        childRef={types.find(type => type.name === 'cuisineTypes').ref}
        searchCriterion={
          types.find(type => type.name === 'cuisineTypes').value || undefined
        }
        backgroundColor="#f7882f"
        defaultText="Any cuisine"
        onValueChange={
          types.find(type => type.name === 'cuisineTypes').callback
        }
        options={types.find(type => type.name === 'cuisineTypes').values}
      />
      <BadgeSelector
        childRef={types.find(type => type.name === 'preparationTypes').ref}
        searchCriterion={
          types.find(type => type.name === 'preparationTypes').value ||
          undefined
        }
        backgroundColor="#f7c331"
        defaultText="Any prep"
        onValueChange={
          types.find(type => type.name === 'preparationTypes').callback
        }
        options={types.find(type => type.name === 'preparationTypes').values}
      />
      <BadgeSelector
        childRef={types.find(type => type.name === 'proteinTypes').ref}
        searchCriterion={
          types.find(type => type.name === 'proteinTypes').value || undefined
        }
        backgroundColor="#dcc7aa"
        defaultText="Any protein"
        onValueChange={
          types.find(type => type.name === 'proteinTypes').callback
        }
        options={types.find(type => type.name === 'proteinTypes').values}
      />
    </View>
    <Text style={styles.errorMessage}>
      {errorMessage}
    </Text>
    <View style={styles.searchResultsWrapper}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipePreview {...item} />}
        ItemSeparatorComponent={Divider}
      />
    </View>
  </View>;

export default Search;
