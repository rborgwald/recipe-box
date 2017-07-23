// @flow
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const USER_ID_KEY = 'userId';

export const saveUserId = (userId: string) =>
  AsyncStorage.setItem(USER_ID_KEY, userId ? userId.toUpperCase() : '');

export const readUserId = (): string => AsyncStorage.getItem(USER_ID_KEY);
