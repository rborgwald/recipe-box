// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BadgeSelector from '../../../components/BadgeSelector';
import type { SearchCriterion } from '../../../api/recipe/model';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  selectorContainer: {
    margin: 20,
  },
});

const Options = ({
  category,
  types,
}: {
  category: number,
  types: Array<any>,
}) =>
  <View style={styles.container}>
    <Text style={styles.headerText}>Option</Text>
    <View style={styles.selectorContainer}>
      <BadgeSelector
        childRef={types[category].ref}
        backgroundColor="#6b7a8f"
        defaultText="- Select Option -"
        onValueChange={types[category].callback}
        options={types[category].values}
        searchCriterion={types[category].value}
      />
    </View>
  </View>;

export default Options;
