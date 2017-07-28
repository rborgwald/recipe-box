/* @flow */
import Config from 'react-native-config';

const { RECIPES_URL } = Config;

export const recipeUrl = `${RECIPES_URL}/api/recipes`;
// export const recipeUrl = 'http://192.168.1.148:12127/api/recipes';
