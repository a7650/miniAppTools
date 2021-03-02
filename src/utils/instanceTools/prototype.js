import Router from '@/router'
import moment from '@/utils/momentConfig'
// import { Toast } from '..'
import { Storage, Toast } from '@/utils'
import { DEVICE_ID } from '@/utils/dataconfig'
import ENV, { ENV_NAME } from '@/env'
import { v4 as uuidv4 } from 'uuid'

export default function(Vue) {
  Vue.prototype.$moment = moment

  Vue.prototype.$setStorage = Storage.set

  Vue.prototype.$getStorage = Storage.get

  Vue.prototype.$toast = Toast

  Vue.prototype.$showLoading = Toast.showLoading

  Vue.prototype.$hideLoading = Toast.hideLoading

  Vue.prototype._router = Router

  Vue.prototype.$deviceId = DEVICE_ID

  Vue.prototype.$envName = ENV_NAME

  Vue.prototype.$env = ENV

  Vue.prototype.$css = { colorTheme: '#007bfd' }

  Vue.prototype.$uuid = uuidv4

  Vue.prototype.$getPageInstance = function(delta = -1) {
    if (delta > -1) {
      return
    }
    const pages = getCurrentPages()
    const index = Math.max(0, pages.length + delta - 1)
    return pages[index] && pages[index].$vm
  }

  Vue.prototype.$withLoading = function(fn, loadingMessage = '正在加载') {
    if (typeof fn === 'function') {
      try {
        Toast.showLoading(loadingMessage)
        const result = fn()
        if (result && typeof result.finally === 'function') {
          result.finally(Toast.hideLoading)
        } else {
          Toast.hideLoading()
        }
        return result
      } catch (e) {
        console.error(e)
        Toast.hideLoading()
      }
    }
  }

  Vue.prototype.$tryWithErrorHandler = function(fn, errorHandler) {
    try {
      fn()
    } catch (e) {
      console.error('tryWithErrorHandler', e)
      errorHandler && errorHandler()
    }
  }
}
