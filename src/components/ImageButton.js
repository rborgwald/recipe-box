// @flow
import React from 'react';
import { TouchableHighlight, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

const ImageButton = ({
  style,
  containerStyle,
  icon,
  imageUri,
  onPress,
}: {
  style?: Image.propTypes.style,
  containerStyle?: TouchableHighlight.style,
  icon?: number,
  imageUri?: string,
  onPress: Function,
}) =>
  <TouchableHighlight
    style={[styles.container, containerStyle]}
    onPress={onPress}
  >
    {imageUri
      ? <Image
          style={[styles.image, style]}
          source={{ uri: imageUri }}
        />
      : <Image
          style={[styles.icon, style]}
          source={icon}
        />}
  </TouchableHighlight>;

export default ImageButton;
