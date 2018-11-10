/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import {hideModal, setRecipe, setRecipeInRecipes, showModal} from '../../store/actions';
import ImageButton from '../../components/ImageButton';
import ImageView from './components/ImageView';
import { store } from '../../store/store';
// $FlowIssue
import closeIcon from '../../images/close-icon.png';
import {deletePhoto, unlinkLocalImage} from "../../api/recipe/recipes";

type Props = { navigation: NavigationScreenProp, token: string };

type State = {
  errorMessage: string,
};

export class ImageViewScreen extends Component<any, Props, State> {
  state = {
    errorMessage: '',
  };
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'View Image',
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

  syncHideModal = () => new Promise((resolve, reject) => {
    store.dispatch(hideModal());
    resolve();
  });

  handleRetakePhoto = () => {
    this.syncHideModal().then(() => {
      const { navigation: { state: { params: { recipe } } } } = this.props;
      store.dispatch(showModal(['ImageCaptureScreen', { recipe }]));
    });

  };

  handleDeletePhoto = async () => {
    const {
      token,
      navigation: { state: { params: { imageUri, recipe: { id } } } },
    } = this.props;

    await deletePhoto(token, id)
      .then(async response => {
        this.setState({ errorMessage: '' });
        await unlinkLocalImage(id, imageUri);
        store.dispatch(hideModal());
        store.dispatch(setRecipe(response));
        store.dispatch(setRecipeInRecipes(response));
      })
      .catch(error => {
        this.setState({
          errorMessage: `Unable to delete photo: ${error.message}`,
        });
      });
  };

  handleAccept = () => {
    store.dispatch(hideModal());
  };

  render() {
    const { navigation: { state: { params: { imageUri } } } } = this.props;
    return (
      <ImageView
        errorMessage={this.state.errorMessage}
        imageUri={imageUri}
        onDeletePhoto={this.handleDeletePhoto}
        onAccept={this.handleAccept}
        onRetakePhoto={this.handleRetakePhoto}
      />
    );
  }
}

const mapStateToProps = state => ({ token: state.token });

export default connect(mapStateToProps)(ImageViewScreen);
