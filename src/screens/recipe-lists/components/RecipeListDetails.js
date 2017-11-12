// @flow
import React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import type { RecipeList } from '../../../api/recipe/model';
import Divider from '../../../components/Divider';
import RecipePreview from '../../search/components/RecipePreview';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    margin: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 15,
    fontWeight: '400',
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
  refreshing,
  onRefresh,
}: {
  recipeList: RecipeList,
  recipes: Array<*>,
  refreshing: boolean,
  onRefresh: Function,
}) =>
  <View style={styles.container}>
    <Text style={styles.header}>
      {recipeList.name}
    </Text>
    <Text style={styles.subHeader}>
      Recipes:
    </Text>
    <View style={styles.recipes}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipePreview {...item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ItemSeparatorComponent={Divider}
      />
    </View>
  </View>;

export default RecipeListDetails;
