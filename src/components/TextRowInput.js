// @flow
import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  header: {
    fontSize: 22,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    height: 40,
    fontSize: 18,
    fontWeight: '300',
    marginLeft: 10,
  },
});

const TextRowInput = ({
  containerStyle,
  headerStyle,
  contentStyle,
  headerText,
  contentText,
  onChangeText,
}: {
  containerStyle?: View.propTypes.style,
  headerStyle?: Text.propTypes.style,
  contentStyle?: Text.propTypes.style,
  headerText: string,
  contentText?: string,
  onChangeText: Function,
}) =>
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.header, headerStyle]}>
      {headerText}:
    </Text>
    <TextInput
      style={[styles.content, contentStyle, { margin: 0 }]}
      value={contentText}
      autoCorrect={false}
      autoCapitalize="none"
      underlineColorAndroid="rgba(0,0,0,0)"
      onChangeText={onChangeText}
      placeholderTextColor="#666"
      onSubmitEditing={() => {}}
    />
  </View>;

export default TextRowInput;
