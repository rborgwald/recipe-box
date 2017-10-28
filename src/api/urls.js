/* @flow */
import Config from 'react-native-config';

const { RECIPES_URL } = Config;

export const recipeUrl = `${RECIPES_URL}/api/recipes`;

export const lookupUrl = `${RECIPES_URL}/api/lookup`;

export const loginUrl = `${RECIPES_URL}/login`;

export const userUrl = `${RECIPES_URL}/api/users`;
