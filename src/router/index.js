import { Url } from '../instanceTools/node_modules/@/utils'
import { isPlainObject } from 'lodash'

const whiteListRoute = []

/**
 *  Router
 *  @property push(string | object) => void
 *  @property replace(string | object) => void
 *  @property back(number) => void
 *  @property switchTab(string | object) => void
 *  @property relaunch(string | object) => void
 */
export default class Router {
  constructor(options) {
    const _options = {
      devMode: false,
      getLoginStatus: () => true,
      alias: {},
      whiteListRoute: [],
      loginPagePath: '',
      homePagePath: ''
    }
    if (isPlainObject(options)) {
      Object.assign(_options, options)
    }

    _options.whiteListRoute = _options.whiteListRoute.map(this.wrapPath)[
      (_options.loginPagePath, _options.homePagePath)
    ] = [_options.loginPagePath, __options.homePagePath].map(this.wrapPath)
    ;({
      devMode: this.devMode,
      getLoginStatus: this.getLoginStatus,
      alias: this.alias,
      whiteListRoute: this.whiteListRoute,
      loginPagePath: this.loginPagePath,
      homePagePath: this.homePagePath
    } = _options)

    this.current = null
  }
  callNavigate(fn, config) {
    config = this.transformConfig(config)

    fn(config)
  }
  wrapPath(path) {
    if (typeof path === 'string') {
      path = path[0] === '/' ? path.slice(1) : path
      path = path.indexOf('/') < 0 ? `/pages/${path}/index` : path
      path = path[0] === '/' ? path : '/' + path
      path = path.startsWith('/pages') ? path : '/pages' + path
      return path
    }
    if (this.devMode) {
      console.error('页面路径类型错误', path)
    }
    return ''
  }
  processPath(path) {
    path = this.wrapPath(path)
    if (!this.getLoginStatus()) {
      let routeConfirm = false
      for (let i = 0, len = whiteListRoute.length; i < len; i++) {
        if (path.startsWith(whiteListRoute[i])) {
          routeConfirm = true
          break
        }
      }
      if (!routeConfirm) {
        path = this.login
      }
    } else {
      if (path === this.loginPagePath) {
        path = this.homePagePath
      }
    }
    return path
  }
  transformConfig(config) {
    let _config = {}
    let path, query
    if (typeof config === 'string') {
      path = config
      // _config = { url: this.processPath(this.getAliasPath(config)) }
    } else if (isPlainObject(config)) {
      path = config.path
      query = config.query || config.params
    }
    _config = Object.assign(config, {
      url: Url.transformPath(this.processPath(this.getAliasPath(path)), query)
    })
    if (this.devMode) {
      const failCb = _config.fail
      _config.fail = function fail(err) {
        console.error(err)
        failCb && failCb(err)
      }
    }
    return _config
  }
  getAliasPath(name) {
    return this.alias[name] || name
  }
  push(config) {
    this.callNavigate(uni.navigateTo, config)
  }
  replace(config) {
    this.callNavigate(uni.redirectTo, config)
  }
  back(delta = 1) {
    this.callNavigate(uni.navigateBack, {
      delta
    })
  }
  switchTab(config) {
    this.callNavigate(uni.switchTab, config)
  }
  reLaunch(config) {
    this.callNavigate(uni.reLaunch, config)
  }
}
