// @flow
import { createStore } from 'redux';
import * as actions from './actions';
import type { Action } from './actions';
import {SearchCriterion} from "../api/recipe/model";

export type State = {
  +mealTypes: SearchCriterion[],
  +cuisineTypes: SearchCriterion[],
  +proteinTypes: SearchCriterion[],
  +preparationTypes: SearchCriterion[],
};

const initialState: State = {
  mealTypes: [],
  cuisineTypes: [],
  proteinTypes: [],
  preparationTypes: [],
};

export const reducer = (state: State = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_MEAL_TYPES: {
      return {
        ...state,
        mealTypes: payload,
      };
    }
    case actions.SET_CUISINE_TYPES: {
      return {
        ...state,
        cuisineTypes: payload,
      };
    }
    case actions.SET_PROTEIN_TYPES: {
      return {
        ...state,
        proteinTypes: payload,
      };
    }
    case actions.SET_PREPARATION_TYPES: {
      return {
        ...state,
        preparationTypes: payload,
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