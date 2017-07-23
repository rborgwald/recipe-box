// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const Search = () =>
  <View style={styles.container}>
    <Text>Search Recipes</Text>
  </View>;

export default Search;
