// @flow
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import type { RecipeList } from '../../../api/recipe/model';
import Divider from '../../../components/Divider';
import RecipePreview from '../../search/components/RecipePreview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
  },
  recipes: {
    flex: 1,
    margin: 10,
    marginTop: 0,
  },
});

const RecipeListDetails = ({
  recipeList,
  recipes,
}: {
  recipeList: RecipeList,
  recipes: Array<*>,
}) =>
  <View style={styles.container}>
    <Text style={styles.header}>
      {recipeList.name}
    </Text>
    <View style={styles.recipes}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipePreview {...item} />}
        ItemSeparatorComponent={Divider}
      />
    </View>
  </View>;

export default RecipeListDetails;
