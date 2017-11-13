// @flow
import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { capitalize } from '../utils/strings';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleWrapper: {
    alignContent: 'center',
    marginRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  picker: {
    width: 150,
    marginRight: 5,
  },
});

const makeItems = (options: string[]) =>
  options.map((value, idx) =>
    <Picker.Item
      key={idx}
      label={capitalize(value)}
      value={capitalize(value)}
    />,
  );

const TypeDropDown = ({
  containerStyle,
  style,
  title,
  selectedValue,
  onValueChange,
  options,
}: {
  containerStyle?: View.propTypes.style,
  style?: Picker.propTypes.style,
  title: string,
  selectedValue?: string,
  onValueChange: Function,
  options: string[],
}) =>
  <View style={(styles.container, containerStyle)}>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>
        {`${title}:`}
      </Text>
    </View>
    <Picker
      selectedValue={selectedValue ? capitalize(selectedValue) : '0'}
      onValueChange={onValueChange}
      style={(styles.picker, style)}
    >
      <Picker.Item label="- None -" value="0" />
      {makeItems(options)}
    </Picker>
  </View>;

export default TypeDropDown;
