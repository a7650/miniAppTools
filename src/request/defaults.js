/*
 * @Author: zhang zhipeng
 * @Date: 2020-02-01 17:25:35
 * @Last Modified by: zhang zhipeng
 * @Last Modified time: 2021-03-02 11:42:52
 */

const defaults = {
  method: 'GET',

  timeout: 60000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  baseURL: '',

  auth: null, // {null | String | Function}

  authKey: 'Authorization',

  authURL: {
    inclusive: null,
    exclusive: null
  } // {null | String[]}
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json;charset=utf-8'
  }
})

export default defaults
