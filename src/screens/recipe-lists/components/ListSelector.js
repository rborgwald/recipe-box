// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import type { RecipeList } from '../../../api/recipe/model';
import BlockButton from '../../../components/BlockButton';
import dot from '../../../images/dot_icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    width: '99%',
    alignItems: 'center',
  },
  recipeName: {
    flexDirection: 'row',
    width: '65%',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  deleteButton: {
    height: 20,
    width: '35%',
    backgroundColor: '#e24949',
    margin: 5,
  },
  dot: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginRight: 5,
    alignSelf: 'center',
  },
});

const ListSelector = ({
  recipeList,
  onPress,
  onDeletePress,
}: {
  recipeList: RecipeList,
  onPress: Function,
  onDeletePress: Function,
}) =>
  <TouchableHighlight onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.recipeName}>
        <Image style={styles.dot} source={dot} />
        <Text style={styles.text}>
          {recipeList.name}
        </Text>
      </View>
      <BlockButton
        style={styles.deleteButton}
        text="Delete List"
        onPress={onDeletePress}
      />
    </View>
  </TouchableHighlight>;

export default ListSelector;