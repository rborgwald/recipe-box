// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageButton from '../../../components/ImageButton';

// $FlowIssue
import snapIcon from '../../../images/snap_image.png';
// $FlowIssue
import flashOnIcon from '../../../images/flash_on_icon.png';
// $FlowIssue
import flashOffIcon from '../../../images/flash_off_icon.png';

const { on: FLASH_ON } = RNCamera.Constants.FlashMode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 7,
  },
  captureImage: { height: 40, width: 40 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: { height: 57, width: 57 },
});

const Scanner = ({
  cameraRef,
  flashMode,
  onToggleFlash,
  onTakePicture,
}: {
  cameraRef: RNCamera,
  flashMode: typeof RNCamera.Constants.FlashMode,
  onToggleFlash: Function,
  onTakePicture: Function,
}) =>
  <View style={styles.container}>
    <RNCamera
      ref={cameraRef}
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={flashMode}
      permissionDialogTitle={'Permission to use camera'}
      permissionDialogMessage={
        'We need your permission to use your camera phone'
      }
    />
    <View style={styles.buttonContainer}>
      <View>
        <ImageButton
          style={styles.captureImage}
          onPress={onToggleFlash}
          icon={flashMode === FLASH_ON ? flashOnIcon : flashOffIcon}
        />
      </View>
      <View>
        <ImageButton
          style={styles.captureImage}
          onPress={onTakePicture}
          icon={snapIcon}
        />
      </View>
      <View style={styles.placeholder} />
    </View>
  </View>;

export default Scanner;
