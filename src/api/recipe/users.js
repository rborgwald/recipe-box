// @flow
import { userUrl } from '../urls';

export const NETWORK_TIMEOUT = 5000;

export const getUsers = (token: string): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(userUrl, {
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
      if (status !== 200) {
        throw Error(responseJson.errorMessage);
      }
      return responseJson;
    })
    .catch(err => {
      throw Error(err);
    });

export const createUser = (
  token: string,
  username: string,
  password: string,
): Promise<*> => {
  const formattedName = username.toLowerCase();

  return timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${userUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        username: formattedName,
        password,
      }),
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

export const updatePassword = (
  token: string,
  username: string,
  password: string,
): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${userUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        username,
        password,
      }),
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

export const deleteUser = (token: string, username: string): Promise<*> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(`${userUrl}?username=${username}`, {
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
