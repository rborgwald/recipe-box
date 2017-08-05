// @flow
import { lookupUrl } from '../urls';

export const getMealTypes = (): Promise<*> =>
  fetch(lookupUrl + '/mealtypes', {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getCuisineTypes = (): Promise<*> =>
  fetch(lookupUrl + '/cuisinetypes', {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getPreparationTypes = (): Promise<*> =>
  fetch(lookupUrl + '/preparationtypes', {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });

export const getProteinTypes = (): Promise<*> =>
  fetch(lookupUrl + '/proteintypes', {
    method: 'GET',
  }).then(async response => {
    const { status } = response;
    const responseJson = await response.json();
    if (status !== 200 && status !== 404) throw Error(responseJson.message);
    if (status === 404) return [];
    return responseJson;
  });