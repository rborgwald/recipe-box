// @flow
import type { State as StoreState } from '../../store/store';
import { loginUrl } from '../urls';

export const NETWORK_TIMEOUT = 5000;

export const login = (
  username: string,
  password: string
): Promise<string> =>
  timeoutPromise(
    NETWORK_TIMEOUT,
    'Request timed out',
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }),
  )
    .then(async response => {
      const { status } = response;
      if (status !== 200) {
        const responseJson = await response.json();
        throw Error(responseJson.message);
      }
      const headers = await response.headers;
      return headers.map.authorization;
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
