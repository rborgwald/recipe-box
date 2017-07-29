// @flow
import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import BlockButton from '../../../components/BlockButton';
import { Recipe } from '../../../api/recipe/model';
import Divider from '../../../components/Divider';
import RecipePreview from './RecipePreview';
import WordButton from '../../../components/WordButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

const Search = ({
  onTextChange,
  onSearchRecipe,
  onClearSearch,
  recipes = [],
  value,
}: {
  onTextChange: Function,
  onSearchRecipe: Function,
  onClearSearch: Function,
  recipes: Recipe[],
  value: string,
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
    <View style={styles.searchResultsWrapper}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipePreview {...item} />}
        ItemSeparatorComponent={Divider}
      />
    </View>
  </View>;

export default Search;
