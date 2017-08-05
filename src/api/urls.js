/* @flow */
import Config from 'react-native-config';

const { RECIPES_URL } = Config;

export const recipeUrl = `${RECIPES_URL}/api/recipes`;

export const lookupUrl = `${RECIPES_URL}/api/lookup`;
