// @flow
import type { State as StoreState } from '../../store/store';
import { recipeUrl } from '../urls';
import type { Recipe } from './model';

export const NETWORK_TIMEOUT = 5000;

export const searchRecipes = (
  token: string,
  queryParams: {
    queryParam: string,
    value: string,
  }[],
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(recipeUrl + makeQueryString(queryParams), {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200 && status !== 404) throw Error(responseJson.message);
      if (status === 404) return [];
      console.log(`status: ${status}`);
      console.log(`response: ${JSON.stringify(responseJson)}`);
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });

const makeQueryString = (queryParams): string => {
  let queryString = '';
  const validQueryParams = queryParams.filter(
    element => element.value !== '' && element.value !== undefined,
  );

  if (validQueryParams.length > 0) {
    queryString += '?';
    validQueryParams.forEach(element => {
      queryString = `${queryString}${element.queryParam}=${element.value}&`;
    });
    queryString = queryString.replace(/&$/, '');
  }
  return queryString;
};

export const getAllRecipes = (token: string): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeUrl}/all`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200 && status !== 404) throw Error(responseJson.message);
      if (status === 404) return [];
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });

export const deleteRecipe = async (token: string, recipe: Recipe): Promise<*> => {
  console.log(`deleteing recipe: ${recipeUrl}/${recipe.id}`);

  const response = await timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeUrl}/${recipe.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }),
  ).catch(err => {
    throw Error(err);
  });

  const { status } = response;
  if (status !== 200 && status !== 404) throw Error(response.message);
  if (status === 404) return [];

  return Promise.resolve();
};

export const updateRecipe = (token: string, recipe: Recipe): Promise<*> => {
  console.log(`recipe to update: ${JSON.stringify(recipe)}`);

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeUrl}/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(recipe),
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200 && status !== 404) throw Error(responseJson.message);
      if (status === 404) return [];
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });
};

export const createRecipe = (
  token: string,
  recipe: $PropertyType<StoreState, 'recipe'>,
): Promise<*> => {
  console.log(`recipe to create: ${JSON.stringify(recipe)}`);

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(recipeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(recipe),
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200 && status !== 404) throw Error(responseJson.message);
      if (status === 404) return [];
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });
};

export const timeoutPromise = (
  timeout: number,
  err: string,
  promise: Promise<*>,
) =>
  new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
