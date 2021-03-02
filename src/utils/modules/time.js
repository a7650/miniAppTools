import moment from '../momentConfig'

const Time = {
  /**
   * 获取localDateTime：YYYY-MM-DD HH:mm:ss
   * @param {string|number} date
   */
  getLocalDateTime(date) {
    return moment(date || Date.now()).format('YYYY-MM-DD HH:mm:ss')
  },
  /**
 * 间隔一定的时间调用函数，直到达到最大次数
 * @param {Function} fn 要执行的函数
 * @param {Int} maxCount 最大执行次数
 * @param {Int} timeout 每次执行的间隔
 */
  invokeCountTimer(fn, maxCount = 1, timeout = 0) {
    if (typeof fn !== 'function') return
    let count = 0
    let timer = null
    function clearTimer() {
      timer && clearInterval(timer)
    }
    timer = setInterval(() => {
      try {
        fn(clearTimer)
      } catch (e) {
        console.error(e)
      } finally {
        if ((count += 1) >= maxCount) {
          clearTimer()
        }
      }
    }, timeout)
    return clearTimer
  }
}

export default Time
