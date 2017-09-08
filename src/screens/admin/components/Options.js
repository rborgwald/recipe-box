// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
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

export const getCallbackFromTypes = (
  types: Array<any>,
  selectedCategory: number,
): Function => {
  const type = types[selectedCategory];
  return type ? type.callback : () => {};
};

const Options = ({
  category,
  options,
  childRef,
  types,
  selectedValue,
}: {
  category: number,
  options: SearchCriterion[],
  childRef: ModalDropdown,
  types: Array<any>,
  selectedValue?: SearchCriterion,
}) =>
  <View style={styles.container}>
    <Text style={styles.headerText}>Option</Text>
    <View style={styles.selectorContainer}>
      <BadgeSelector
        childRef={childRef}
        backgroundColor="#5EBC9E"
        defaultText="- Add New -"
        onValueChange={getCallbackFromTypes(types, category)}
        options={options}
        searchCriterion={selectedValue}
      />
    </View>
  </View>;

export default Options;
