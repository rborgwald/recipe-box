// @flow
import React from 'react';
import { View } from 'react-native';

const Divider = ({ style }: { style?: View.propTypes.style }) =>
  <View
    style={[
      {
        width: '100%',
        height: 1.5,
        backgroundColor: '#666',
        opacity: 0.1,
        alignSelf: 'center',
      },
      style,
    ]}
  />;

export default Divider;
