// @flow
import type { State } from './store';
import type {Recipe} from "../api/recipe/model";

export const SET_RECIPE: 'SET_RECIPE' = 'SET_RECIPE';
export const SET_RECIPES: 'SET_RECIPES' = 'SET_RECIPES';
export const SET_RECIPE_IN_RECIPES: 'SET_RECIPE_IN_RECIPES' = 'SET_RECIPE_IN_RECIPES';
export const SET_MEAL_TYPES: 'SET_MEAL_TYPES' = 'SET_MEAL_TYPES';
export const SET_CUISINE_TYPES: 'SET_CUISINE_TYPES' = 'SET_CUISINE_TYPES';
export const SET_PROTEIN_TYPES: 'SET_PROTEIN_TYPES' = 'SET_PROTEIN_TYPES';
export const SET_PREPARATION_TYPES: 'SET_PREPARATION_TYPES' =
  'SET_PREPARATION_TYPES';
export const SET_LOGIN: 'SET_LOGIN' = 'SET_LOGIN';
export const SET_TOKEN: 'SET_TOKEN' = 'SET_TOKEN';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_USERS: 'SET_USERS' = 'SET_USERS';
export const SET_LOGOUT: 'SET_LOGOUT' = 'SET_LOGOUT';
export const SET_RECIPE_LISTS: 'SET_RECIPE_LISTS' = 'SET_RECIPE_LISTS';
export const SHOW_MODAL: 'SHOW_MODAL' = 'SHOW_MODAL';
export const HIDE_MODAL: 'HIDE_MODAL' = 'HIDE_MODAL';

export type Action =
  | SetRecipeAction
  | SetRecipesAction
  | SetRecipeInRecipesAction
  | SetMealTypesAction
  | SetCuisineTypesAction
  | SetProteinTypesAction
  | SetPreparationTypesAction
  | SetLoginAction
  | SetTokenAction
  | SetUserAction
  | SetUsersAction
  | SetLogoutAction
  | SetRecipeListsAction
  | ShowModalAction
  | HideModalAction;

type SetRecipeAction = {
  type: typeof SET_RECIPE,
  payload: $PropertyType<State, 'recipe'>,
};
export const setRecipe = (recipe: $PropertyType<State, 'recipe'>) => ({
  type: SET_RECIPE,
  payload: recipe,
});

type SetRecipesAction = {
  type: typeof SET_RECIPES,
  payload: $PropertyType<State, 'recipes'>,
};
export const setRecipes = (recipes: $PropertyType<State, 'recipes'>) => ({
  type: SET_RECIPES,
  payload: recipes,
});

type SetRecipeInRecipesAction = {
  type: typeof SET_RECIPE_IN_RECIPES,
  payload: Recipe,
};
export const setRecipeInRecipes = (recipe: Recipe) => ({
  type: SET_RECIPE_IN_RECIPES,
  payload: recipe,
});

type SetMealTypesAction = {
  type: typeof SET_MEAL_TYPES,
  payload: $PropertyType<State, 'mealTypes'>,
};
export const setMealTypes = (mealTypes: $PropertyType<State, 'mealTypes'>) => ({
  type: SET_MEAL_TYPES,
  payload: mealTypes,
});

type SetCuisineTypesAction = {
  type: typeof SET_CUISINE_TYPES,
  payload: $PropertyType<State, 'cuisineTypes'>,
};
export const setCuisineTypes = (
  cuisineTypes: $PropertyType<State, 'cuisineTypes'>,
) => ({
  type: SET_CUISINE_TYPES,
  payload: cuisineTypes,
});

type SetProteinTypesAction = {
  type: typeof SET_PROTEIN_TYPES,
  payload: $PropertyType<State, 'proteinTypes'>,
};
export const setProteinTypes = (
  proteinTypes: $PropertyType<State, 'proteinTypes'>,
) => ({
  type: SET_PROTEIN_TYPES,
  payload: proteinTypes,
});

type SetPreparationTypesAction = {
  type: typeof SET_PREPARATION_TYPES,
  payload: $PropertyType<State, 'preparationTypes'>,
};
export const setPreparationTypes = (
  preparationTypes: $PropertyType<State, 'preparationTypes'>,
) => ({
  type: SET_PREPARATION_TYPES,
  payload: preparationTypes,
});

type SetLoginAction = {
  type: typeof SET_LOGIN,
  payload: $PropertyType<State, 'username'>,
};
export const setLogin = (username: $PropertyType<State, 'username'>) => {
  return {
    type: SET_LOGIN,
    payload: username,
  };
};

type SetTokenAction = {
  type: typeof SET_TOKEN,
  payload: $PropertyType<State, 'token'>,
};
export const setToken = (token: $PropertyType<State, 'token'>) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

type SetUserAction = {
  type: typeof SET_USER,
  payload: $PropertyType<State, 'username'>,
};
export const setUser = (username: $PropertyType<State, 'username'>) => {
  return {
    type: SET_USER,
    payload: username,
  };
};

type SetUsersAction = {
  type: typeof SET_USERS,
  payload: $PropertyType<State, 'users'>,
};
export const setUsers = (
  users: $PropertyType<State, 'users'>,
) => ({
  type: SET_USERS,
  payload: users,
});

type SetLogoutAction = {
  type: typeof SET_LOGOUT,
  payload: null,
};
export const setLogout = () => {
  return {
    type: SET_LOGOUT,
    payload: null,
  };
};

type SetRecipeListsAction = {
  type: typeof SET_RECIPE_LISTS,
  payload: $PropertyType<State, 'recipeLists'>,
};
export const setRecipeLists = (
  recipeLists: $PropertyType<State, 'recipeLists'>,
) => ({
  type: SET_RECIPE_LISTS,
  payload: recipeLists,
});

type ShowModalAction = {
  type: typeof SHOW_MODAL,
  payload: Array<mixed>,
};
export const showModal = (args: Array<mixed>) => ({
  type: SHOW_MODAL,
  payload: args,
});

type HideModalAction = {
  type: typeof HIDE_MODAL,
  payload: void,
};
export const hideModal = (): HideModalAction => ({
  type: HIDE_MODAL,
  payload: undefined,
});
