/*
 * @Author: zhang zhipeng
 * @Date: 2020-02-01 17:25:00
 * @Last Modified by: zhang zhipeng
 * @Last Modified time: 2021-01-14 11:30:50
 */

import {
  flattenHeaders,
  transformPath
} from '../utils.js'

export default function dispatchRequest(config) {
  procressConfig(config)
  return uniRequest(config).then(res => {
    return transformResponse(res, config)
  })
}

function procressConfig(config) {
  config.headers = transformHeaders(config)
  config.url = transformURL(config.baseURL, config.url, config.params, config.method)
  config.method = (config.method || 'GET').toUpperCase()
}

function transformURL(baseURL = '', url, params, method) {
  const finalUrl = baseURL + url
  return method === 'GET' ? finalUrl : transformPath(finalUrl, params || null)
}

function transformHeaders(config) {
  const headers = flattenHeaders(config.headers, config.method)
  const { auth, authKey, authURL, url } = config
  if (authURL.exclusive && authURL.exclusive.includes(url)) {
    return headers
  }
  if (authURL.inclusive && !authURL.inclusive.includes(url)) {
    return headers
  }
  if (auth &&
    authKey &&
    typeof authKey === 'string' &&
    headers[authKey] === undefined &&
    headers[authKey.toLowerCase()] === undefined) {
    const authType = typeof config.auth
    let authStr = ''
    if (authType === 'string') {
      authStr = auth
    } else if (authType === 'function') {
      authStr = auth()
    }
    if (authStr && typeof authStr === 'string') {
      headers[authKey] = authStr
    }
  }
  return headers
}

function transformResponse(res, config) {
  res.config = config
  return res
}

function uniRequest(config) {
  return new Promise((resolve, reject) => {
    const {
      url,
      method,
      data,
      params,
      timeout,
      headers: header,
      dataType = 'json',
      responseType = 'text',
      cancelToken
    } = config
    const requestTask = uni.request({
      url,
      method,
      data: method === 'GET' ? params : data,
      header,
      timeout,
      dataType,
      responseType,
      success: res => resolve(res),
      fail: err => reject(err),
      complete: () => { }
    })
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        reject(reason)
        requestTask.abort()
      })
    }
  })
}
