/* @flow */
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';
import type { State } from '../store/store';
import SideMenuNavigator from './SideMenuNavigator';
import RecipeDetailsScreen from '../screens/recipe-details/RecipeDetailsScreen';
import ImageCaptureScreen from '../screens/image-capture/ImageCaptureScreen';

export const ModalNav = StackNavigator(
  {
    SideMenuNavigator: {
      screen: SideMenuNavigator,
    },
    RecipeDetailsScreen: {
      screen: RecipeDetailsScreen,
    },
    ImageCaptureScreen: {
      screen: ImageCaptureScreen,
    },
  },
  {
    mode: 'modal',
  },
);

type Props = {
  navigation: NavigationScreenProp,
  showModal: $PropertyType<State, 'showModal'>,
};
export class ModalNavWrapper extends Component<any, Props, void> {
  componentWillReceiveProps(nextProps: Props) {
    const { showModal } = this.props;
    const { showModal: shouldShowModal } = nextProps;

    if (showModal.length < shouldShowModal.length) {
      this.modalNavRef._navigation.navigate(..._.last(shouldShowModal));
    } else if (showModal.length > shouldShowModal.length) {
      this.modalNavRef._navigation.goBack();
    }
  }

  modalNavRef: ModalNav;

  handleModalNavRef = (ref: StackNavigator) => {
    this.modalNavRef = ref;
  };

  render() {
    return <ModalNav ref={this.handleModalNavRef} />;
  }
}

const mapStateToProps = state => ({
  showModal: state.showModal,
});

export default connect(mapStateToProps)(ModalNavWrapper);
