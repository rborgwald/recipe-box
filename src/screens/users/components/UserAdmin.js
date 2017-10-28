// @flow
import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import type { User } from '../../../api/recipe/model';
import Divider from '../../../components/Divider';
import UserPreview from './UserPreview';
import WordButton from '../../../components/WordButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textRow: {
    marginTop: 15,
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  clearButton: {
    alignSelf: 'center',
    color: 'blue',
  },
  saveButton: {
    height: 40,
    width: '25%',
    backgroundColor: '#29a709',
    margin: 5,
  },
  updateButton: {
    height: 40,
    width: '25%',
    backgroundColor: '#5EBC9E',
    margin: 5,
  },
  deleteButton: {
    height: 40,
    width: '25%',
    backgroundColor: '#e24949',
    margin: 5,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '300',
  },
  successMessage: {
    color: 'green',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '300',
  },
  userListContainer: {
    flex: 1,
    margin: 10,
    marginTop: 20,
  },
  activeUsersButton: {
    alignSelf: 'center',
  },
});

const UserAdmin = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSavePress,
  onUpdatePress,
  onDeletePress,
  successMessage,
  errorMessage,
  users,
  onSearchUsers,
  onClearPress,
}: {
  username: string,
  password: string,
  onUsernameChange: Function,
  onPasswordChange: Function,
  onSavePress: Function,
  onUpdatePress: Function,
  onDeletePress: Function,
  successMessage: string,
  errorMessage: string,
  users: Array<any>,
  onSearchUsers: Function,
  onClearPress: Function,
}) =>
  <ScrollView>
    <View style={styles.container}>
      <TextRowInput
        containerStyle={styles.textRow}
        onChangeText={onUsernameChange}
        headerText="Username"
        contentText={username}
      />
      <TextRowInput
        containerStyle={styles.textRow}
        onChangeText={onPasswordChange}
        headerText="Password"
        contentText={password}
      />
      <Text style={styles.errorMessage}>
        {errorMessage}
      </Text>
      <Text style={styles.successMessage}>
        {successMessage}
      </Text>
      <View style={styles.buttonContainer}>
        <BlockButton
          style={styles.saveButton}
          text="Save"
          onPress={onSavePress}
          disabled={username === '' || password === ''}
        />
        <BlockButton
          style={styles.updateButton}
          text="Update"
          onPress={onUpdatePress}
          disabled={username === '' || password === ''}
        />
        <BlockButton
          style={styles.deleteButton}
          text="Delete"
          onPress={onDeletePress}
          disabled={username === ''}
        />
      </View>
      <View>
        <WordButton
          style={styles.clearButton}
          text="Clear"
          onPress={onClearPress}
        />
      </View>
      <View style={styles.userListContainer}>
        <WordButton
          style={styles.activeUsersButton}
          text="- Get Active Users -"
          onPress={onSearchUsers}
        />
        <FlatList
          data={users}
          renderItem={({ item }) => <UserPreview {...item} />}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </View>
  </ScrollView>;

export default UserAdmin;
