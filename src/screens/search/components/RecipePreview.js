// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import Ratings from '../../../components/Ratings';
import type { State as StoreState } from '../../../store/store';
import chevron from '../../../images/chevron-right.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: '99%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  recipeInfo: {
    flexDirection: 'column',
    width: '75%',
  },
  subHeader: {
    flexDirection: 'row',
  },
  details: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export const makeDetails = (source: string, volume: string, page: string) => {
  let details: string = '';
  if (source) {
    details += source;
  }
  if (volume) {
    details += ` - ${volume}`;
  }
  if (page) {
    details += ` (pg. ${page})`;
  }
  return details;
};

const RecipePreview = ({
  recipe,
  onViewRecipe,
}: {
  recipe: $PropertyType<StoreState, 'recipe'>,
  onViewRecipe: Function,
}) =>
  <TouchableHighlight onPress={onViewRecipe}>
    <View style={styles.container}>
      <View style={styles.recipeInfo}>
        <Text style={styles.text}>
          {recipe ? recipe.name : ''}
        </Text>

        <View style={styles.subHeader}>
          <Text style={styles.details}>
            {recipe
              ? makeDetails(recipe.source, recipe.volume, recipe.page)
              : ''}
          </Text>
          <Ratings
            maxRating={3}
            rating={recipe && recipe.stars ? recipe.stars : 0}
            size={15}
            disabled={true}
          />
        </View>
      </View>
      <Image style={styles.image} source={chevron} />
    </View>
  </TouchableHighlight>;

export default RecipePreview;
