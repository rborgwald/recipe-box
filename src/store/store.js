// @flow
import { createStore } from 'redux';
import * as actions from './actions';
import type { Action } from './actions';
import type { SearchCriterion, Recipe } from '../api/recipe/model';

export type State = {
  +recipe: Recipe | null,
  +recipes: Recipe[],
  +mealTypes: SearchCriterion[],
  +cuisineTypes: SearchCriterion[],
  +proteinTypes: SearchCriterion[],
  +preparationTypes: SearchCriterion[],
  +username: string,
  +token: string,
  +isLoggedIn: boolean,
};

const initialState: State = {
  recipe: null,
  recipes: [],
  mealTypes: [],
  cuisineTypes: [],
  proteinTypes: [],
  preparationTypes: [],
  username: '',
  token: '',
  isLoggedIn: false,
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
    case actions.SET_RECIPE: {
      return {
        ...state,
        recipe: payload,
      };
    }
    case actions.SET_RECIPES: {
      return {
        ...state,
        recipes: payload,
      };
    }
    case actions.SET_LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        username: payload,
      };
    }
    case actions.SET_TOKEN: {
      return {
        ...state,
        token: payload,
      };
    }
    case actions.SET_USER: {
      return {
        ...state,
        username: payload,
      };
    }
    case actions.SET_LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        token: '',
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
