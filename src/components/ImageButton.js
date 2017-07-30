import React from 'react';
import { TouchableHighlight, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
});

const ImageButton = ({
  style,
  icon,
  onPress,
}: {
  style?: Image.propTypes.style,
  icon: number,
  onPress: Function,
}) =>
  <TouchableHighlight style={styles.container} onPress={onPress}>
    <Image style={[styles.image, style]} source={icon} />
  </TouchableHighlight>;

export default ImageButton;
