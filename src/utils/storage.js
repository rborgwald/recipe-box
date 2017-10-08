// @flow
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const USER_KEY = 'username';
const TOKEN_KEY = 'token';

const keys = [USER_KEY, TOKEN_KEY];

export const saveUser = (user: string) => AsyncStorage.setItem(USER_KEY, user ? user : '');


export const readUser = (): string => AsyncStorage.getItem(USER_KEY);

export const saveToken = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);


export const readToken = (): string => AsyncStorage.getItem(TOKEN_KEY);

export const deleteToken = () => AsyncStorage.removeItem(TOKEN_KEY);

type ReadAll = {
  username: string,
  token: string,
};
export const readAll = (): Promise<ReadAll> =>
  AsyncStorage.multiGet(keys).then(_.fromPairs).then(res => ({
    ...res,
  }));
