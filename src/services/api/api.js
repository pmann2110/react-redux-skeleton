import axios from 'axios';

import { AppConfigs } from 'common';

/**
 * Get Root Link from env config
 * @param {string} apiType
 * @param {boolean} isAuthorized
 * @returns {string}
 */
const getRootLink = () => {
  return AppConfigs.getDefaultApiEndpoint();
};

/**
 * Get Full API Link
 * @param {string} link
 * @param options
 * @returns {string}
 */
const getFullAPILink = (link, options = {}) => {
  return getRootLink(options.apiType, options.isAuthorized) + link;
};

/**
 * Success response interceptor
 * @param response
 * @returns {any}
 */
const handleSuccess = (response) => {
  return response;
};

/**
 * Error response interceptor
 * @param error
 * @returns {Promise}
 */
const handleError = (error) => {
  return Promise.reject(error);
};

/**
 * Create an Axios Client with defaults
 */
const service = axios.create();
service.interceptors.response.use(handleSuccess, handleError);


/**
 * Get Request headers
 * @param options
 */
const getRequestHeaders = async () => {
  return {};
};

/**
 * Handle Response
 * @param data
 * @returns {Promise}
 */
const handleResponseData = (data) => {
  if (!!data && data.status === 200 || data.status === 201) {
    return Promise.resolve(data);
  }

  return Promise.reject(data);
};

/**
 * GET request
 * @param {string} path
 * @param options
 * @returns {Promise<any>}
 */
export const GET = async (path, options) => {
  const requestHeaders = await getRequestHeaders(options);
  path = getFullAPILink(path, options);
  return service.get(path, {
    headers: requestHeaders
  }).then((data) => {
    return handleResponseData(data);
  }, (err) => {
    return Promise.reject(err);
  });
};

/**
 * POST request
 * @param {string} path
 * @param payload
 * @param options
 * @returns {Promise<any>}
 */
export const POST = async (path, payload, options) => {
  const requestHeaders = await getRequestHeaders(options);
  path = getFullAPILink(path, options);
  return service.request({
    method: 'POST',
    url: path,
    responseType: 'json',
    data: payload,
    headers: requestHeaders
  }).then((data) => {
    return handleResponseData(data);
  }, (err) => {
    return Promise.reject(err);
  });
};

/**
 * PUT request
 * @param {string} path
 * @param payload
 * @param options
 * @returns {Promise<any>}
 */
export const PUT = async (path, payload, options) => {
  const requestHeaders = await getRequestHeaders(options);
  path = getFullAPILink(path, options);
  return service.request({
    method: 'PUT',
    url: path,
    responseType: 'json',
    data: payload,
    headers: requestHeaders
  }).then((data) => {
    return handleResponseData(data);
  }, (err) => {
    return Promise.reject(err);
  });
};

/**
 * DELETE request
 * @param {string} path
 * @param payload
 * @param options
 * @returns {Promise<any>}
 * @constructor
 */
export const DELETE = async (path, payload, options) => {
  const requestHeaders = await getRequestHeaders(options);
  path = getFullAPILink(path, options);
  return service.request({
    method: 'DELETE',
    url: path,
    responseType: 'json',
    data: payload,
    headers: requestHeaders
  }).then((data) => {
    return handleResponseData(data);
  }, (err) => {
    return Promise.reject(err);
  });
};
