import { isPlainObject } from '../index'

const Url = {
  /**
   * path后加参数
   * @param {string} path
   * @param {object} params
   */
  transformPath(path = '', params = {}) {
    if (typeof path !== 'string') {
      return ''
    }
    if (!isPlainObject(params)) {
      return path
    }
    let paramsStr = ''
    Object.keys(params).forEach((key) => {
      paramsStr += `&${key}=${
        typeof params[key] === 'string'
          ? params[key]
          : JSON.stringify(params[key])
      }`
    })
    paramsStr = paramsStr.substr(1)
    if (!paramsStr) {
      return path
    }
    return `${path}${path.indexOf('?') > -1 ? '&' : '?'}${paramsStr}`
  },
  getFileName(path) {
    return typeof path === 'string'
      ? path.replace(/(.*\/)*([^.]+).*/gi, '$2')
      : ''
  }
}

export default Url
