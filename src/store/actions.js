// @flow
import type { State } from './store';

export const SET_MEAL_TYPES: 'SET_MEAL_TYPES' = 'SET_MEAL_TYPES';
export const SET_CUISINE_TYPES: 'SET_CUISINE_TYPES' = 'SET_CUISINE_TYPES';
export const SET_PROTEIN_TYPES: 'SET_PROTEIN_TYPES' = 'SET_PROTEIN_TYPES';
export const SET_PREPARATION_TYPES: 'SET_PREPARATION_TYPES' = 'SET_PREPARATION_TYPES';

export type Action =
  | SetMealTypesAction
  | SetCuisineTypesAction
  | SetProteinTypesAction
  | SetPreparationTypesAction;

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
export const setCuisineTypes = (cuisineTypes: $PropertyType<State, 'cuisineTypes'>) => ({
  type: SET_CUISINE_TYPES,
  payload: cuisineTypes,
});

type SetProteinTypesAction = {
  type: typeof SET_PROTEIN_TYPES,
  payload: $PropertyType<State, 'proteinTypes'>,
};
export const setProteinTypes = (proteinTypes: $PropertyType<State, 'proteinTypes'>) => ({
  type: SET_PROTEIN_TYPES,
  payload: proteinTypes,
});

type SetPreparationTypesAction = {
  type: typeof SET_PREPARATION_TYPES,
  payload: $PropertyType<State, 'preparationTypes'>,
};
export const setPreparationTypes = (preparationTypes: $PropertyType<State, 'preparationTypes'>) => ({
  type: SET_PREPARATION_TYPES,
  payload: preparationTypes,
});