import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 10,
  },
});

const TextRowInput = ({
  headerStyle,
  contentStyle,
  headerText,
  contentText,
}: {
  headerStyle?: Text.propTypes.style,
  contentStyle?: Text.propTypes.style,
  headerText: string,
  contentText: string,
}) =>
  <View style={styles.container}>
    <Text style={[styles.header, headerStyle]}>
      {headerText}:
    </Text>
    <TextInput
      style={[styles.content, contentStyle]}
      value={contentText}
      autoCorrect={false}
      autoCapitalize="none"
      underlineColorAndroid="rgba(0,0,0,0)"
      onChangeText={() => {}}
      placeholderTextColor="#666"
      onSubmitEditing={() => {}}
    />
  </View>;

export default TextRowInput;
