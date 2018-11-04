// @flow
import { createStore } from 'redux';
import _ from 'lodash';
import * as actions from './actions';
import type { Action } from './actions';
import type {SearchCriterion, Recipe, RecipeList, User} from '../api/recipe/model';

export type State = {
  +recipe: Recipe | null,
  +recipes: Recipe[],
  +users: User[],
  +mealTypes: SearchCriterion[],
  +cuisineTypes: SearchCriterion[],
  +proteinTypes: SearchCriterion[],
  +preparationTypes: SearchCriterion[],
  +username: string,
  +token: string,
  +isLoggedIn: boolean,
  +recipeLists: RecipeList[],
  +showModal: Array<mixed>[], // e.g. ['RecipeDetailsScreen', { recipe }]
};

const initialState: State = {
  recipe: null,
  recipes: [],
  users: [],
  mealTypes: [],
  cuisineTypes: [],
  proteinTypes: [],
  preparationTypes: [],
  username: '',
  token: '',
  isLoggedIn: false,
  recipeLists: [],
  showModal: [],
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
    case actions.SET_RECIPE_IN_RECIPES: {
      const updatedRecipe = payload;
      // $FlowFixMe
      const updatedRecipes = _.remove(state.recipes, r => r.id !== updatedRecipe.id);
      updatedRecipes.push(updatedRecipe);
      return {
        ...state,
        recipes: updatedRecipes,
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
    case actions.SET_RECIPE_LISTS: {
      return {
        ...state,
        recipeLists: payload,
      };
    }
    case actions.SET_USERS: {
      return {
        ...state,
        users: payload,
      };
    }
    case actions.SHOW_MODAL: {
      return {
        ...state,
        showModal: [...state.showModal, payload],
      };
    }
    case actions.HIDE_MODAL: {
      const newShowModal = [...state.showModal];
      newShowModal.pop();
      return {
        ...state,
        showModal: newShowModal,
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
