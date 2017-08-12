import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    width: '33%',
    borderWidth: 0,
    backgroundColor: 'blue',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFF',
  },
  disabled: {
    backgroundColor: 'grey',
  },
});

const BlockButton = ({
  style,
  text,
  textStyle,
  onPress,
  disabled,
}: {
  style?: TouchableHighlight.propTypes.style,
  text: string,
  textStyle?: Text.propTypes.style,
  onPress: Function,
  disabled?: boolean,
}) =>
  <TouchableHighlight
    style={[
      styles.container,
      style,
      disabled ? { backgroundColor: 'grey' } : {},
    ]}
    onPress={disabled ? () => {} : onPress}
    underlayColor={disabled ? 'grey' : '#bbb'}
    activeOpacity={1}
  >
    <Text style={[styles.text, textStyle]}>
      {text}
    </Text>
  </TouchableHighlight>;

export default BlockButton;
