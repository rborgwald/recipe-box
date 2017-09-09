// @flow
import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import BlockButton from '../../../components/BlockButton';
import type { SearchCriterion } from '../../../api/recipe/model';
import Divider from '../../../components/Divider';
import RecipePreview from './RecipePreview';
import WordButton from '../../../components/WordButton';
import BadgeSelector from '../../../components/BadgeSelector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  searchInput: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    marginVertical: 15,
    marginHorizontal: 5,
  },
  badgeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 0,
  },
  searchButton: {
    backgroundColor: '#29a709',
    margin: 5,
    width: '42%',
  },
  clearButton: {
    backgroundColor: '#e24949',
    margin: 5,
    width: '42%',
  },
  buttonText: {
    fontSize: 20,
  },
  searchResultsWrapper: {
    margin: 10,
    marginTop: 0,
    marginBottom: 170,
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

export const getValueFromTypes = (
  types: Array<any>,
  typeName: string,
): Function => {
  const type = types.find(element => element.name === typeName);
  return type ? type.value : () => {};
};

export const getOptionsFromTypes = (
  types: Array<any>,
  typeName: string,
): SearchCriterion[] => {
  const type = types.find(element => element.name === typeName);
  return type ? type.values : [];
};

const Search = ({
  types,
  onTextChange,
  onSearchRecipe,
  onClearSearch,
  recipes = [],
  textValue,
  errorMessage,
}: {
  types: Array<any>,
  onTextChange: Function,
  onSearchRecipe: Function,
  onClearSearch: Function,
  recipes: Array<any>,
  textValue: string,
  errorMessage: string,
}) =>
  <View style={styles.container}>
    <View style={styles.infoWrapper}>
      <View style={styles.detailsContainer}>
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
        <View style={styles.buttonContainer}>
          <BlockButton
            style={styles.searchButton}
            textStyle={styles.buttonText}
            text="Search"
            onPress={onSearchRecipe}
          />
          <BlockButton
            style={styles.clearButton}
            textStyle={styles.buttonText}
            text="Clear"
            onPress={onClearSearch}
          />
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <BadgeSelector
          childRef={getRefFromTypes(types, 'mealTypes')}
          searchCriterion={getValueFromTypes(types, 'mealTypes')}
          backgroundColor="#6b7a8f"
          defaultText="Any meal"
          onValueChange={getCallbackFromTypes(types, 'mealTypes')}
          options={getOptionsFromTypes(types, 'mealTypes')}
        />
        <BadgeSelector
          childRef={getRefFromTypes(types, 'cuisineTypes')}
          searchCriterion={getValueFromTypes(types, 'cuisineTypes')}
          backgroundColor="#f7882f"
          defaultText="Any cuisine"
          onValueChange={getCallbackFromTypes(types, 'cuisineTypes')}
          options={getOptionsFromTypes(types, 'cuisineTypes')}
        />
        <BadgeSelector
          childRef={getRefFromTypes(types, 'preparationTypes')}
          searchCriterion={getValueFromTypes(types, 'preparationTypes')}
          backgroundColor="#f7c331"
          defaultText="Any prep"
          onValueChange={getCallbackFromTypes(types, 'preparationTypes')}
          options={getOptionsFromTypes(types, 'preparationTypes')}
        />
        <BadgeSelector
          childRef={getRefFromTypes(types, 'proteinTypes')}
          searchCriterion={getValueFromTypes(types, 'proteinTypes')}
          backgroundColor="#dcc7aa"
          defaultText="Any protein"
          onValueChange={getCallbackFromTypes(types, 'proteinTypes')}
          options={getOptionsFromTypes(types, 'proteinTypes')}
        />
      </View>
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
