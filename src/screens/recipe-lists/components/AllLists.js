// @flow
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Divider from '../../../components/Divider';
import ListSelector from './ListSelector';

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
});

const AllLists = ({ lists }: { lists: Array<any> }) =>
  <View style={styles.container}>
    <Text style={styles.header}>All Lists:</Text>
    <View>
      <FlatList
        data={lists}
        renderItem={({ item }) => <ListSelector {...item} />}
        ItemSeparatorComponent={Divider}
      />
    </View>
  </View>;

export default AllLists;
