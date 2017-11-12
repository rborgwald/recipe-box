// @flow
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Divider from '../../../components/Divider';
import TypeDropDown from '../../../components/TypeDropDown';
import ListSelector from './ListSelector';
import type { User } from '../../../api/recipe/model';
import BlockButton from '../../../components/BlockButton';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    margin: 15,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '400',
  },
  users: {
    flex: 1,
    margin: 10,
    marginTop: 0,
  },
  addToList: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  listPicker: {
    height: 30,
    width: 220,
  },
  addToListButton: {
    backgroundColor: '#29a709',
    margin: 5,
    marginBottom: 8,
    height: 20,
    width: '25%',
  },
});

const RecipeListUserDetails = ({
  currentUsers,
  allUsers,
  selectedUser,
  onUserChange,
  onAddToList,
}: {
  currentUsers: Array<*>,
  allUsers: User[],
  selectedUser: User | null,
  onUserChange: Function,
  onAddToList: Function,
}) =>
  <View style={styles.container}>
    <Text style={styles.subHeader}>Current Users:</Text>
    <View style={styles.users}>
      <FlatList
        data={currentUsers}
        renderItem={({ item }) =>
          <ListSelector {...item} buttonText="Remove User" />}
        ItemSeparatorComponent={Divider}
      />
    </View>
    <View style={styles.addToList}>
      <TypeDropDown
        style={styles.listPicker}
        title="Add user to list"
        selectedValue={
          selectedUser ? selectedUser.username : 'No user selected'
        }
        onValueChange={onUserChange}
        options={
          allUsers
            ? allUsers.map(user => user.username)
            : ['no users available']
        }
      />
      <BlockButton
        style={styles.addToListButton}
        text="Add"
        onPress={onAddToList}
      />
    </View>
  </View>;

export default RecipeListUserDetails;
