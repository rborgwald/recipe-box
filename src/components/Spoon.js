// @flow
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import spoonSelected from '../images/spoon-icon-selected.png';
import spoonUnselected from '../images/spoon-icon-unselected.png';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});

const Spoon = ({
  id,
  selected,
  onRatingChange,
  size,
  disabled,
}: {
  id: number,
  selected: boolean,
  onRatingChange: Function,
  size: number,
  disabled: boolean,
}) =>
  <TouchableOpacity onPress={() => onRatingChange(id)} disabled={disabled} >
    <Image
      style={[styles.image, {height: size, width: size}]}
      source={selected ? spoonSelected : spoonUnselected}
    />
  </TouchableOpacity>;

export default Spoon;
