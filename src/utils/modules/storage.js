
const Storage = {
  /**
   * 从storage中同步获取值
   * @param {string} key
   * @param {{clear:boolean}} options
   */
  get(key = '', options) {
    const defaultOptions = {
      clear: false
    }
    if (typeof options === 'boolean') {
      options = {
        clear: options
      }
    }
    options = Object.assign({}, defaultOptions, options)
    const result = uni.getStorageSync(key)
    if (options.clear) {
      uni.removeStorageSync(key)
    }
    return result
  },
  /**
   * 在storage中同步设置值
   * @param {string} key
   * @param {any} data
   */
  set(key = '', data) {
    return uni.setStorageSync(key, data)
  },
  /**
   * 在storage中同步删除值
   * @param {string} key
   */
  remove(key = '') {
    return uni.removeStorageSync(key)
  }
}

export default Storage

