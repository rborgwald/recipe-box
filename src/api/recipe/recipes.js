// @flow
import { recipeUrl } from '../urls';

export const searchRecipes = (searchString: string): Promise<*> =>
  fetch(recipeUrl + '/name/' + searchString, {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getAllRecipes = (): Promise<*> =>
  fetch(recipeUrl + '/all', {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });