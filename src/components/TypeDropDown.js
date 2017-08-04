import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { capitalize } from '../utils/strings';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    alignContent: 'center',
    marginRight: 5
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  picker: {
    width: 100,
  }
});

const makeItems = (options: string[]) =>
  options.map((value, idx) =>
    <Picker.Item key={idx} label={capitalize(value)} value={idx + 1} />,
  );

const TypeDropDown = ({
  title,
  selectedValue,
  onValueChange,
  options,
}: {
  title: string,
  selectedValue?: string,
  onValueChange: Function,
  options: string[],
}) =>
  <View style={styles.container}>
<View style={styles.titleWrapper} >
    <Text style={styles.title}>
      {title + ':'}
    </Text>
</View>
    <Picker
      selectedValue={selectedValue ? selectedValue : "0"}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label="- None -" value="0" />
      {makeItems(options)}
    </Picker>
  </View>;

export default TypeDropDown;
