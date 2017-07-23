// @flow
import type { State } from './store';

export const SET_USERID: 'SET_USERID' = 'SET_USERID';

export type Action =
  | SetUserIdAction;

type SetUserIdAction = {
  type: typeof SET_USERID,
  payload: $PropertyType<State, 'userId'>,
};
export const setUserId = (userId: $PropertyType<State, 'userId'>) => ({
  type: SET_USERID,
  payload: userId,
});
