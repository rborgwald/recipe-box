// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const Admin = () =>
  <View style={styles.container}>
    <Text>Manage Recipes</Text>
  </View>;

export default Admin;
