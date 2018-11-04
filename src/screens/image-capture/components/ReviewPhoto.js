// @flow
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import ImageButton from '../../../components/ImageButton';
// $FlowIssue
import checkMarkIcon from '../../../images/check_mark.png';
// $FlowIssue
import redoIcon from '../../../images/redo_icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  reviewContainer: {
    flex: 7,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
  },
  checkMarkImage: { height: 50, width: 50 },
  redoImage: { height: 40, width: 40 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: { height: 57, width: 57 },
  errorMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessageText: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
});

const ReviewPhoto = ({
  imageUri,
  errorMessage,
  onRedoPhoto,
  onSavePhoto,
}: {
  imageUri: string,
  errorMessage: string,
  onRedoPhoto: Function,
  onSavePhoto: Function,
}) =>
  <View style={styles.container}>
    <View style={styles.reviewContainer}>
      <Image style={styles.backgroundImage} source={{ uri: imageUri }} />
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.placeholder} />
      <View>
        <ImageButton
          style={styles.checkMarkImage}
          onPress={onSavePhoto}
          icon={checkMarkIcon}
        />
      </View>
      <View>
        <ImageButton
          style={styles.redoImage}
          onPress={onRedoPhoto}
          icon={redoIcon}
        />
      </View>
    </View>
    <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageText}>
        {errorMessage}
      </Text>
    </View>
  </View>;

export default ReviewPhoto;
