import { ENV_NAME } from '@/env'
import { Url } from '@/utils'
import { isPlainObject } from 'lodash'
import store from '@/store/index'

const whiteListRoute = []

/**
 *  Router
 *  @property push(string | object) => void
 *  @property replace(string | object) => void
 *  @property back(number) => void
 *  @property switchTab(string | object) => void
 *  @property relaunch(string | object) => void
 */
export class Router {
  constructor(options) {
    if (isPlainObject(options)) {
      this.alias = options.alias || {}
    }
  }
  @transformConfig
  push(config) {
    uni.navigateTo(config)
  }
  @transformConfig
  replace(config) {
    uni.redirectTo(config)
  }
  back(delta = 1) {
    uni.navigateBack({
      delta
    })
  }
  @transformConfig
  switchTab(config) {
    uni.switchTab(config)
  }
  @transformConfig
  reLaunch(config) {
    uni.reLaunch(config)
  }
}

function processPath(path) {
  if (typeof path === 'string') {
    path = path[0] === '/' ? path.slice(1) : path
    path = path.indexOf('/') < 0 ? `/pages/${path}/index` : path
    path = path[0] === '/' ? path : '/' + path
    path = path.startsWith('/pages') ? path : '/pages' + path
    if (!store.getters.loginStatus) {
      let routeConfirm = false
      for (let i = 0, len = whiteListRoute.length; i < len; i++) {
        if (path.startsWith(whiteListRoute[i])) {
          routeConfirm = true
          break
        }
      }
      if (!routeConfirm) {
        path = '/pages/login/index'
      }
    } else {
      if (path === '/pages/login/index') {
        path = '/pages/index/index'
      }
    }
    return path
  }
  if (ENV_NAME === 'development') {
    console.error('页面路径类型错误', path)
  }
  return ''
}

// 合并配置
function transformConfig(target, name, descriptor) {
  var oldValue = descriptor.value
  descriptor.value = function(...args) {
    let _config = {}
    const config = args[0]
    if (typeof config === 'string') {
      _config = { url: processPath(config) }
    }
    if (isPlainObject(config)) {
      _config = Object.assign(config, {
        url: Url.transformPath(processPath(config.url || config.path), config.params)
      })
    }
    if (!_config.url) {
      return false
    }
    if (ENV_NAME === 'development') {
      const failCb = _config.fail
      _config.fail = function fail(err) {
        console.error(err)
        failCb && failCb(err)
      }
    }
    return oldValue.apply(this, [_config])
  }
  return descriptor
}

export default new Router()
