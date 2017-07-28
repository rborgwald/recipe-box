import React from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#000',
  },
});

const WordButton = ({
  style,
  text,
  onPress,
}: {
  style?: Text.propTypes.style,
  text: string,
  onPress: Function,
}) =>
  <TouchableHighlight onPress={onPress} underlayColor="transparent">
    <Text style={[styles.text, style]}>
      {text}
    </Text>
  </TouchableHighlight>;

export default WordButton;
