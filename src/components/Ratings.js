// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import Spoon from './Spoon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 2,
  },
});

export const makeRating = (
  maxRating: number,
  rating: number,
  size: number,
  onRatingChange: Function,
  disabled: boolean,
) => {
  let selectedSpoonCount = 0;
  let totalSpoonCount: number = 0;
  return _.times(maxRating, () => {
    if (selectedSpoonCount < rating) {
      selectedSpoonCount++;
      totalSpoonCount++;
      const idx = totalSpoonCount;
      return (
        <Spoon
          key={idx}
          id={idx}
          selected={true}
          onRatingChange={onRatingChange}
          size={size}
          disabled={disabled}
        />
      );
    } else {
      totalSpoonCount++;
      const idx = totalSpoonCount;
      return (
        <Spoon
          key={idx}
          id={idx}
          selected={false}
          onRatingChange={onRatingChange}
          size={size}
          disabled={disabled}
        />
      );
    }
  });
};

const Ratings = ({
  maxRating,
  rating,
  onRatingChange,
  size,
  disabled,
}: {
  maxRating: number,
  rating: number,
  onRatingChange?: Function,
  size?: number,
  disabled?: boolean,
}) =>
  <View style={styles.container}>
    {makeRating(
      maxRating,
      rating,
      size ? size : 30,
      onRatingChange ? onRatingChange : () => {},
      disabled ? disabled : false,
    )}
  </View>;

export default Ratings;
