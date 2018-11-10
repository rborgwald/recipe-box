// @flow
import React from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import ImageButton from '../../../components/ImageButton';
// $FlowIssue
import deleteIcon from '../../../images/delete_icon.png';
// $FlowIssue
import redoIcon from '../../../images/redo_icon.png';
// $FlowIssue
import checkIcon from '../../../images/check_mark.png';

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
  deleteImage: { height: 40, width: 40 },
  checkImage: { height: 40, width: 40 },
  redoImage: { height: 37, width: 37 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
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
  errorMessage,
  imageUri,
  onDeletePhoto,
  onAccept,
  onRetakePhoto,
}: {
  errorMessage: string,
  imageUri: string,
  onDeletePhoto: Function,
  onAccept: Function,
  onRetakePhoto: Function,
}) =>
  <View style={styles.container}>
    <View style={styles.reviewContainer}>
      <Image style={styles.backgroundImage} source={{ uri: imageUri }} />
    </View>
    <View style={styles.buttonContainer}>
      <View>
        <ImageButton
          style={styles.deleteImage}
          onPress={() =>
            Alert.alert('Warning', 'Are you sure you want to delete this image?', [
              { text: 'Cancel', onPress: () => {} },
              { text: 'Yes', onPress: onDeletePhoto },
            ])}
          icon={deleteIcon}
        />
      </View>
      <View>
        <ImageButton
          style={styles.checkImage}
          onPress={onAccept}
          icon={checkIcon}
        />
      </View>
      <View>
        <ImageButton
          style={styles.redoImage}
          onPress={onRetakePhoto}
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
