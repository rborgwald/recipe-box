// @flow
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import BlockButton from '../../../components/BlockButton';

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
    width: '75%',
    borderColor: '#666',
    borderWidth: 1,
    margin: 5,
  },
});

const Search = ({
  onTextChange,
  onSearchRecipe,
}: {
  onTextChange: Function,
  onSearchRecipe: Function,
}) =>
  <View style={styles.container}>
    <View style={styles.searchInputWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="enter recipe to search"
        autoCorrect={false}
        autoCapitalize="none"
        underlineColorAndroid="rgba(0,0,0,0)"
        onChangeText={onTextChange}
        placeholderTextColor="#666"
      />
      <BlockButton text="Search" onPress={onSearchRecipe} />
    </View>
  </View>;

export default Search;
