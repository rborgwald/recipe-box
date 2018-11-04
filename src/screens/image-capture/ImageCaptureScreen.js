/* @flow */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import {hideModal, setRecipe, setRecipeInRecipes} from '../../store/actions';
import ImageButton from '../../components/ImageButton';
import Scanner from './components/Scanner';
import { store } from '../../store/store';
// $FlowIssue
import closeIcon from '../../images/close-icon.png';
import ReviewPhoto from './components/ReviewPhoto';
import { downloadImage, savePhoto } from '../../api/recipe/recipes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

type Props = { navigation: NavigationScreenProp, token: string };
type State = {
  isScanning: boolean,
  imageUri: string,
  camera: {
    flashMode: typeof RNCamera.Constants.FlashMode,
  },
  errorMessage: string,
};
export class ImageCaptureScreen extends Component<any, Props, State> {
  state = {
    isScanning: true,
    imageUri: '',
    camera: {
      flashMode: RNCamera.Constants.FlashMode.on,
    },
    errorMessage: '',
  };
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Image Capture',
    headerLeft: (
      <ImageButton
        onPress={() => {
          navigation.goBack();
          store.dispatch(hideModal());
        }}
        icon={closeIcon}
      />
    ),
  });

  camera: RNCamera;

  handleTakePicture = async () => {
    const options = {
      quality: 0.1,
      base64: true,
      fixOrientation: true,
      forceUpOrientation: true,
    };
    const data = await this.camera.takePictureAsync(options);
    this.setState({ isScanning: false, imageUri: data.uri });
  };

  toggleFlash = () => {
    const { camera, camera: { flashMode } } = this.state;
    const { on, off } = RNCamera.Constants.FlashMode;

    this.setState({
      camera: { ...camera, flashMode: flashMode === on ? off : on },
    });
  };

  handleRedoPhoto = () => {
    this.setState({
      isScanning: true,
      imageUri: '',
    });
  };

  handleSavePhoto = async () => {
    const {
      token,
      navigation: { state: { params: { recipe: { id } } } },
    } = this.props;
    const { imageUri } = this.state;

    await savePhoto(token, id, imageUri)
      .then(async response => {
        this.setState({ errorMessage: '' });
        await downloadImage(token, id, response.imageFilename);
        store.dispatch(hideModal());
        store.dispatch(setRecipe(response));
        store.dispatch(setRecipeInRecipes(response));
      })
      .catch(error => {
        this.setState({
          errorMessage: `Unable to save photo: ${error.message}`,
        });
      });
  };

  render() {
    const {
      isScanning,
      imageUri,
      camera: { flashMode },
      errorMessage,
    } = this.state;

    return isScanning
      ? <Scanner
          cameraRef={ref => {
            this.camera = ref;
          }}
          flashMode={flashMode}
          onToggleFlash={this.toggleFlash}
          onTakePicture={this.handleTakePicture}
        />
      : <ReviewPhoto
          imageUri={imageUri}
          errorMessage={errorMessage}
          onRedoPhoto={this.handleRedoPhoto}
          onSavePhoto={this.handleSavePhoto}
        />;
  }
}

const mapStateToProps = state => ({ token: state.token });

export default connect(mapStateToProps)(ImageCaptureScreen);
