/**
 * @file 接口封装文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fetch  from 'isomorphic-fetch';
import config from '../../configs/config';

let url = '/api/v1';

const env = process.env.NODE_ENV;

if (env === 'development') {
  url = config.dev.apiService + url;
}
else {
  url = config.build.apiService + url;
}

function fetchData(url, options) {
  return fetch(url, { credentials: 'include', ...options }).then((response) => {
    if (response.status >= 400) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response.json();
  }).catch((err) => err);
}

export const user = {
  getUser(path, params = {}, method = 'get') {
    return fetchData(url + path, { ...params, method });
  },
  getJson(path, params = {}, method = 'get') {
    return fetchData(url + path, { ...params, method });
  }
};
