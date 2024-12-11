import axios from 'axios';

// api
import {
  BASE_URL,
  HEADERS,
  RESPONSE_DEV_TIMEOUT,
  translationNameSpace,
} from './constants';

// types
import { Env } from 'types/enums';

// utils
import { getEnvVars } from 'config';
import { sleep } from 'test/testHelpers';

export const setBaseUrl = (): void => {
  // TODO: we need to set base url dependly on environment
  axios.defaults.baseURL = BASE_URL;
};

export const setHeaders = (): void => {
  axios.defaults.headers.common = HEADERS;
};

export const setRequestInterceptor = (): void => {
  axios.interceptors.request.use(
    (config) => ({ ...config, timeout: 10000 }),
    (error) => Promise.reject(error),
  );
};

export const setResponseInterceptor = (): void => {
  axios.interceptors.response.use(
    async (response) => {
      if (getEnvVars().NODE_ENV === Env.development) {
        const value = localStorage.getItem(RESPONSE_DEV_TIMEOUT);
        const timeout = value !== null ? parseInt(value) : 2000;

        await sleep(timeout);
      }

      return response.data;
    },
    () => Promise.reject(`${translationNameSpace}.error`),
  );
};

export const configureAxios = (): void => {
  setBaseUrl();
  setHeaders();
  setRequestInterceptor();
  setResponseInterceptor();
};
