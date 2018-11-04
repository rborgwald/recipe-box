// @flow
import type { State as StoreState } from '../../store/store';
import { recipeUrl } from '../urls';
import type { Recipe } from './model';
import { getPathOnly, getPathWithFilename } from '../../utils/directoryStorage';
import RNFetchBlob from 'react-native-fetch-blob';
const RNFS = require('react-native-fs');

export const NETWORK_TIMEOUT = 60000;

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

export const deleteRecipe = (token: string, recipe: Recipe): Promise<*> => {
  console.log(`deleteing recipe: ${recipeUrl}/${recipe.id}`);

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeUrl}/${recipe.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }),
  )
    .then(async response => {
      const { status } = await response;
      if (status !== 200) {
        if (
          response._bodyText.contains(
            'constraint [recipe_list_mapping_recipe_id_fk]',
          )
        ) {
          throw new Error(
            'Unable to delete recipe - it is part of a recipe list',
          );
        }
        throw new Error(response._bodyText);
      }
      return Promise.resolve();
    })
    .catch(err => {
      throw Error(err);
    });
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

export const savePhoto = (
  token: string,
  id: string,
  imageUri: string,
): Promise<*> => {
  const data = new FormData();
  data.append(
    'file',
    ({ uri: imageUri, name: `${id}.jpg`, type: 'image/jpg' }: any),
  );

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${recipeUrl}/${id}/images`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      body: data,
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
};

export const downloadImage = async (
  token: string,
  recipeId: string,
  filename: string,
) => {
  if (!!filename) {
    const path = getPathWithFilename(recipeId, filename);

    return await RNFS.exists(path)
      .then(response => {
        if (response) {
          return path;
        } else {
          return RNFetchBlob.fetch('GET', `${recipeUrl}/${recipeId}/images`, {
            Authorization: token,
          })
            .then(res => {
              let base64Str = res.base64();
              return RNFS.mkdir(getPathOnly(recipeId))
                .then(() => {
                  return RNFS.writeFile(path, base64Str, 'base64')
                    .then(() => {
                      return path;
                    })
                    .catch(error => {
                      throw Error(error);
                    });
                })
                .catch(error => {
                  throw Error(error);
                });
            })
            .catch(error => {
              console.warn(error);
              throw Error(error);
            });
        }
      })
      .catch(error => {
        throw Error(error);
      });
  }
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
