// @flow
import React from 'react';
import { Text, View } from 'react-native';
import { screenWidth, isAndroid } from '../utils/device';

const makeWrapper = (width, wrappedText) =>
  <View
    style={{
      width,
      height: '100%',
      alignSelf: 'flex-end',
      marginRight: screenWidth() / 2 - width / 2,
    }}
  >
    {wrappedText}
  </View>;

const makeText = children =>
  <Text
    style={{
      height: isAndroid() ? '100%' : null,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontWeight: 'normal',
      color: '#000',
      fontSize: 17,
    }}
  >
    {children}
  </Text>;

/*
Create manually-centered view wrapper on Android platform
because Android headers are left-justified by default.
We don't need the wrapper on iOS because headers are centered
by default
*/
const NavHeaderTitle = ({
  children,
  width = 200,
}: {
  children: string,
  width?: number,
}) =>
  isAndroid() ? makeWrapper(width, makeText(children)) : makeText(children);

export default NavHeaderTitle;
