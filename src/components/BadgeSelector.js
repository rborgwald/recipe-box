// @flow
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import type { SearchCriterion } from '../api/recipe/model';

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 37,
    borderRadius: 37 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 5,
  },
  selectionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
  },
});

const BadgeSelector = ({
  searchCriterion,
  backgroundColor,
  defaultText,
  style,
  textStyle,
  onValueChange,
  options,
  childRef,
}: {
  searchCriterion?: SearchCriterion | null,
  backgroundColor: string,
  defaultText: string,
  style?: ModalDropdown.propTypes.style,
  textStyle?: Text.propTypes.style,
  onValueChange: Function,
  options: SearchCriterion[],
  childRef?: ModalDropdown,
}) =>
  <ModalDropdown
    style={[styles.container, { backgroundColor }]}
    textStyle={[styles.selectionText, textStyle]}
    defaultValue={searchCriterion ? searchCriterion.description : defaultText}
    defaultIndex={searchCriterion ? searchCriterion.idx : 0}
    options={[defaultText].concat(
      options.sort((a, b) => a.idx - b.idx).map(option => option.description),
    )}
    onSelect={idx => {
      onValueChange(idx);
    }}
    ref={childRef}
  />;

export default BadgeSelector;
