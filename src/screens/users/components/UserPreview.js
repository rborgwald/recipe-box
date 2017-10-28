// @flow
import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Ratings from '../../../components/Ratings';
import type { User } from '../../../api/recipe/model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: '99%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  userInfo: {
    flexDirection: 'column',
    width: '75%',
  },
  subHeader: {
    flexDirection: 'row',
  },
  details: {
    fontSize: 12,
    fontWeight: '400',
  },
});

const UserPreview = ({
  user,
  onUserPress,
}: {
  user: User,
  onUserPress: Function,
}) =>
  <TouchableHighlight onPress={onUserPress}>
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.text}>
          {user ? user.username : ''}
        </Text>
      </View>
    </View>
  </TouchableHighlight>;

export default UserPreview;
