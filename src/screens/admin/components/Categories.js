// @flow
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 20,
  },
  radioGroup: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
  },
});

const Categories = ({
  categories,
  onPress,
}: {
  categories: Array<any>,
  onPress: Function,
}) =>
  <View style={styles.container}>
    <Text style={styles.headerText}>Category</Text>
    <RadioForm
      style={styles.radioGroup}
      radio_props={categories}
      initial={0}
      buttonColor={'#5EBC9E'}
      animation
      onPress={onPress}
    />
  </View>;

export default Categories;
