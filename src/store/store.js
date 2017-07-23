// @flow
import { createStore } from 'redux';
import * as actions from './actions';
import type { Action } from './actions';

export type State = {
  +userId: string,
};

const initialState: State = {
  userId: '',
};

export const reducer = (state: State = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_USERID: {
      return {
        ...state,
        userId: payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export type Store = {
  dispatch: Action => Action,
  subscribe: Function,
  getState: Function,
  replaceReducer: Function,
};
export const store: Store = createStore(reducer);
