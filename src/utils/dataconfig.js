class StatusConstructor {
  constructor(list) {
    this.list = list
    this.map = this.toMap(list)
    this.filter = this.toFilter(this.map)
  }
  toMap(arr) {
    return arr.reduce((pre, cur) => {
      pre[cur.value] = cur.label
      return pre
    }, {})
  }
  toFilter(dataSource) {
    return (value = '') => dataSource[value] || value || ''
  }
}
