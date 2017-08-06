// @flow
import { recipeUrl } from '../urls';
import { SearchCriterion } from './model';

export const searchRecipes = (
  queryParams: {
    queryParam: string,
    value: string,
  }
): Promise<*> =>

  fetch(recipeUrl + makeQueryString(queryParams), {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

const makeQueryString = (queryParams): string => {
  let queryString = '';
  const validQueryParams = queryParams.filter(element => element.value !== '' && element.value !== undefined);
  console.log('validQueryParams: ' + JSON.stringify(validQueryParams));

  if (validQueryParams.length > 0) {
    queryString = queryString + '?';
    validQueryParams.map((element) => {
      queryString = queryString + element.queryParam + '=' + element.value + '&';
    });
    console.log('queryString after map: ' + queryString);
    queryString = queryString.replace(/\&$/, '');
  }
  console.log('final queryString: ' + queryString);
    return queryString;
};

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
  console.log('recipe to update: ' + JSON.stringify(recipe));

  return fetch(recipeUrl + '/' + recipe.id, {
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
    console.log('response: ' + JSON.stringify(responseJson));
    return responseJson;
  });
};
