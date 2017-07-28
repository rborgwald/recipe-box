import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 32,
    width: '25%',
    borderRadius: 32 / 2,
    borderWidth: 1,
    backgroundColor: 'blue',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFF'
  },
});

const BlockButton = ({
  style,
  text,
  textStyle,
  onPress,
}: {
  style?: TouchableHighlight.propTypes.style,
  text: string,
  textStyle?: Text.propTypes.style,
  onPress: Function,
}) =>
  <TouchableHighlight
    style={styles.container}
    onPress={onPress}
    underlayColor='#bbb'
    activeOpacity={1}
  >
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableHighlight>;

export default BlockButton;
