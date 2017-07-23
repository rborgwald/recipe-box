/* @flow */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

const Dashboard = ({

}: {
}) =>
  <View style={styles.container}>
    <ScrollView>
      <View>
        <Text>Dashboard</Text>
      </View>
    </ScrollView>
  </View>;

export default Dashboard;
