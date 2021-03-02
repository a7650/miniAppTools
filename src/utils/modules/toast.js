/**
 * 消息提示
 * @param {String} title
 * @param {Number} duration
 * @param {String} icon
 */
function Toast(title, duration = 1500, icon = 'none') {
  if (typeof duration === 'string') {
    icon = duration
    duration = 1500
  }
  setTimeout(() => {
    uni.showToast({
      title,
      duration,
      icon
    })
  }, 200)
}

/**
 * 打开loading
 * @param {String} title
 * @param {Boolean} mask
 */
function showLoading(title = '正在加载', mask = true) {
  uni.showLoading({
    title,
    mask
  })
}

/**
 * 关闭loading
 */
function hideLoading() {
  uni.hideLoading()
}

Toast.showLoading = showLoading
Toast.hideLoading = hideLoading

export default Toast

