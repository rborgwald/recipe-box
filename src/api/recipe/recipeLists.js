// @flow
import { recipeListsUrl } from '../urls';
import type {Recipe, RecipeList} from "./model";

export const NETWORK_TIMEOUT = 5000;

export const getRecipeListsForUser = (
  token: string,
  username: string,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeListsUrl}?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      throw Error(
        'Something unexpected happened getting recipe lists for user',
      );
    });

export const getRecipesForList = (
  token: string,
  recipeListId: string,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeListsUrl}/${recipeListId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export const createRecipeList = (
  token: string,
  recipeName: string,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeListsUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: recipeName,
      }),
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200) throw Error(responseJson.message);
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });

export const deleteRecipeList = (token: string, id: string): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeListsUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }),
  )
    .then(async response => {
      const { status } = response;

      if (status !== 200) {
        const responseJson = await response.json();
        throw Error(responseJson.message);
      }
      return Promise.resolve();
    })
    .catch(err => {
      throw Error(err);
    });

export const addRecipeToRecipeList = (
  token: string,
  recipe: Recipe,
  recipeList: RecipeList,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeListsUrl}/${recipeList.id}/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200) throw Error(responseJson.message);
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });

export const deleteRecipeFromRecipeList = (
  token: string,
  recipe: Recipe,
  recipeList: RecipeList,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeListsUrl}/${recipeList.id}/recipes/${recipe.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }),
  )
    .then(async response => {
      const { status } = response;
      if (status !== 200) {
        const responseJson = await response.json();
        throw Error(responseJson.message);
      }
      return Promise.resolve();
    })
    .catch(err => {
      throw Error(err);
    });

export const timeoutPromise = (
  timeout: number,
  err: string,
  promise: Promise<*>,
) =>
  new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
