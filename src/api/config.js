import request from '@/utils/request'
import { Toast, Auth } from '@/utils'
import ENV from '../env'
import store from '@/store'

let networkConnected = true

// 监听网络状态
uni.onNetworkStatusChange((res) => {
  networkConnected = res.isConnected
})

request.defaults.baseURL = ENV.API_BASE_URL

// 发送请求的时候会加上authKey的请求头
// request.defaults.authKey = 'Employee-Mobile-Authorization-Token'

// exclusive属性包含的url将不会添加authKey请求头
// request.defaults.authURL.exclusive = null /** @property {string[] | null} */

// request.defaults.auth = Auth.getToken

const responseErrorHandler = {
  statusCode500(config, data) {
    console.log(config)
    if (!config.ignoreError) {
      Toast(data.msg || '服务异常')
    }
  },
  statusCode401(config) {
    console.log(config)
    store.dispatch('user/logout', { shouldDispatchLogout: false })
  },
  statusCode498(config) {
    console.log(config)
  },
  statusCode404(config) {
    Toast('Unknown Request')
    console.log(config)
  },
  statusOffline() {
    Toast('网络异常，请连接网络再试')
  }
}

export const processHeaders = (headers = {}) => Object.assign({}, headers, {})

const interceptorRequest = [
  (config) => {
    console.log(config.url)
    if (!networkConnected) {
      responseErrorHandler.statusOffline()
      return Promise.reject()
    } else {
      config.headers = processHeaders(config.headers)
      return Promise.resolve(config)
    }
  }
]

const interceptorResponse = [
  (res) => {
    const { statusCode, data, config } = res
    if (data.stateCode === 401) {
      Toast('登录失效')
      store.dispatch('user/logout', { shouldDispatchLogout: false })
      return
    }
    let errorHandler = responseErrorHandler[`statusCode${statusCode}`]
    if (statusCode >= 500) {
      errorHandler = responseErrorHandler['statusCode500']
    }
    if (errorHandler) {
      // 如果需要对特定的状态码处理，在responseErrorHandler里处理
      errorHandler(config, data)

      return Promise.reject(data)
    }
    if (data.isSuccess === true) {
      if (data.stateCode === 1) {
        return Promise.resolve(data.payload)
      } else {
        Toast(data.msg)
        return Promise.reject()
      }
    } else if (data.isSuccess === undefined && data) {
      return Promise.resolve(data)
    } else {
      Toast('Request Fail')
      return Promise.reject()
    }
  },
  (err) => {
    if (!networkConnected) {
      responseErrorHandler.statusOffline()
    }
    return Promise.reject(err)
  }
]

request.interceptors.request.use(...interceptorRequest)
request.interceptors.response.use(...interceptorResponse)

export default request
