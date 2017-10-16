// @flow
import { lookupUrl } from '../urls';
import type { SearchCriterion } from './model';

export const NETWORK_TIMEOUT = 5000;

export const getMealTypes = (token: string): Promise<*> =>
  fetch(`${lookupUrl}/mealtypes`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then(async response => {
    const {status} = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getCuisineTypes = (token: string): Promise<*> =>
  fetch(`${lookupUrl}/cuisinetypes`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getPreparationTypes = (token: string): Promise<*> =>
  fetch(`${lookupUrl}/preparationtypes`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getProteinTypes = (token: string): Promise<*> =>
  fetch(`${lookupUrl}/proteintypes`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const createType = (
  token: string,
  typeCategory: string,
  description: string,
): Promise<*> => {
  const name = description.toUpperCase().replace(' ', '_');
  const type = {
    name,
    description,
  };

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${lookupUrl}/${typeCategory}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(type),
    }),
  )
    .then(async response => {
      const { status } = response;
      const responseJson = await response.json();
      if (status !== 200) {
        throw Error(responseJson.errorMessage);
      }
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });
};

export const updateType = (
  token: string,
  typeCategory: string,
  type: SearchCriterion,
  newDescription: string,
): Promise<*> => {
  const updatedType = { ...type, description: newDescription };

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${lookupUrl}/${typeCategory}/${type.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(updatedType),
    }),
  )
    .then(async response => {
      const { status } = await response;
      const responseJson = await response.json();
      if (status !== 200) {
        throw Error(responseJson.errorMessage);
      }
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });
};

export const deleteType = (
  token: string,
  typeCategory: string,
  id: number,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${lookupUrl}/${typeCategory}/${id}`, {
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
        const responseJson = await response.json();
        throw Error(responseJson.errorMessage);
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
