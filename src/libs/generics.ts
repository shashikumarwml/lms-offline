import getHeaders from './getHeaders';
import {axiosInstance} from './utils';

export const parseObjToQuery = (queryObj: any) => {
  if (queryObj && Object.keys(queryObj).length) {
    const parsedQuery = Object.keys(queryObj).map(mapItem => {
      if (!queryObj[mapItem]) {
        return null;
      }
      return `&${mapItem}=${queryObj[mapItem]}`;
    });
    return parsedQuery.join('').slice(1);
  }
  return '';
};

export function axiosErrorHelper(error: any) {
  const err = error;
  console.log('error: ', error);
  const response = err.response;
  const {data, status, statusText} = response;
  let errors = {};
  if (status === 400 && data && Object.keys(data).length > 0) {
    errors = data;
  } else {
    errors.nonFieldErrors = [statusText, 'Please try later'];
  }
  return errors;
}

export async function genericGetService(apiPath: any, accessToken = '') {
  const headers = getHeaders(accessToken);
  try {
    return {data: await axiosInstance.get(apiPath, {headers})};
  } catch (error) {
    return {errors: axiosErrorHelper(error)};
  }
}

export const genericFormService = async (
  action: string,
  APIEndpoint: string,
  accessToken: string,
  postData: any,
  isMulti = false,
) => {
  const headers = getHeaders(accessToken, isMulti);
  try {
    return {
      data: await axiosInstance(APIEndpoint, postData, {headers}),
    };

  } catch (errors) {
    return {errors: axiosErrorHelper(errors)};
  }
};

export const genericDeleteService = async (
  APIEndpoint: string,
  accessToken: string,
) => {
  const headers = getHeaders(accessToken);
  try {
    return {
      data: await axiosInstance.delete(APIEndpoint, {headers}),
    };
  } catch (errors) {
    return {errors: axiosErrorHelper(errors)};
  }
};
