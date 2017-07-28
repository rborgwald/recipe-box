/* @flow */
import { NavigationActions } from 'react-navigation';

export const navigateModalNavigator = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'ModalNavigator' })],
});