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

export const updateRecipe = (recipe: Recipe): Promise<*> => {
  console.log('in api: ' + JSON.stringify(recipe));

  fetch(recipeUrl + '/' + recipe.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    console.log('after update: ' + JSON.stringify(responseJson));
    return responseJson;
  });
};