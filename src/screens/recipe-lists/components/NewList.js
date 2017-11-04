// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BlockButton from '../../../components/BlockButton';
import TextRowInput from '../../../components/TextRowInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
  },
  addListContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRowInput: {
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: 5,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: '#29a709',
    margin: 5,
    height: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
  },
});

const NewList = ({
  textValue,
  onTextChange,
  onAddList,
}: {
  textValue: string,
  onTextChange: Function,
  onAddList: Function,
}) =>
  <View style={styles.container}>
    <Text style={styles.header}>Add New List</Text>
    <View style={styles.addListContainer}>
      <TextRowInput
        containerStyle={styles.textRowInput}
        onChangeText={onTextChange}
        headerText="Name"
        contentText={textValue}
      />
      <View style={styles.buttonContainer}>
        <BlockButton
          style={styles.addButton}
          textStyle={styles.buttonText}
          text="Add"
          onPress={onAddList}
        />
      </View>
    </View>
  </View>;

export default NewList;
