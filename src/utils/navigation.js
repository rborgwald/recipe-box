/* @flow */
import { NavigationActions } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';

export const navigateHomeScreen = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export const navigateModalNavigator = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'ModalNavigator' })],
});

export const navigateEntryScreen = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Entry' })],
});
