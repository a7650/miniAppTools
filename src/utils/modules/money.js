const Money = {
  /**
   * 保留指定的位数
   * @param {Any} val
   * @param {Number} fractionDigits
   */
  fixed(val, fractionDigits = 2) {
    return Number(Number(val).toFixed(fractionDigits))
  },
  /**
 * 将金额格式化
 * 大于零且最多两位小数
 * @param {String | Number} value
 * @returns {String | Number}
 */
  format(value) {
    value = String(value).replace(/[^\d.]/g, '')
    const _v = parseFloat(value)
    if (!value || (!_v && _v !== 0) || _v < 0) {
      return ''
    }
    if (value.split('.').length > 2) {
      return _v.toFixed(2)
    }
    const str = value.indexOf('.')
    let numlen = 0
    if (str > -1) {
      numlen = value.substring(str + 1, value.length).length
    }
    if (numlen <= 2) {
      return value
    } else {
      return parseFloat(value).toFixed(2)
    }
  }
}

export default Money
