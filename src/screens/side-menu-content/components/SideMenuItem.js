// @flow
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

const styles = {
  touchableOpacityStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  textStyle: {
    fontSize: 25,
    textAlign: 'left',
    flex: 4,
    paddingLeft: 10,
    color: '#f7882f',
  },
  imageStyle: {
    height: 25,
    width: 25,
    flex: 1,
    resizeMode: 'contain',
    padding: 10,
    tintColor: '#bbb',
  },
  circleContainerStyle: {
    flex: 1,
  },
};

const SideMenuItem = ({
  title,
  icon,
  count,
  style,
  active = false,
  onPress,
}: {
  title: string,
  icon: number,
  count?: number | null,
  style?: View.propTypes.style,
  active?: boolean,
  onPress?: Function,
}) =>
  <TouchableOpacity style={styles.touchableOpacityStyle} onPress={onPress}>
    <Image source={icon} style={styles.imageStyle} />
    <Text style={styles.textStyle}>
      {title}
    </Text>
  </TouchableOpacity>;

export default SideMenuItem;
