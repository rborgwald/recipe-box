// @flow
import { createStore } from 'redux';
import * as actions from './actions';
import type { Action } from './actions';
import { SearchCriterion, Recipe } from '../api/recipe/model';

export type State = {
  +recipe: Recipe,
  +recipes: Recipe[],
  +mealTypes: SearchCriterion[],
  +cuisineTypes: SearchCriterion[],
  +proteinTypes: SearchCriterion[],
  +preparationTypes: SearchCriterion[],
};

const initialState: State = {
  recipe: {},
  recipes: [],
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
