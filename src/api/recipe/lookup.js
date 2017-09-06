// @flow
import { lookupUrl } from '../urls';
import type { SearchCriterion } from './model';

export const NETWORK_TIMEOUT = 5000;

export const getMealTypes = (): Promise<*> =>
  fetch(`${lookupUrl}/mealtypes`, {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getCuisineTypes = (): Promise<*> =>
  fetch(`${lookupUrl}/cuisinetypes`, {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getPreparationTypes = (): Promise<*> =>
  fetch(`${lookupUrl}/preparationtypes`, {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getProteinTypes = (): Promise<*> =>
  fetch(`${lookupUrl}/proteintypes`, {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const createType = (
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

export const deleteType = (typeCategory: string, id: number): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${lookupUrl}/${typeCategory}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
