/*
 * @Author: zhang zhipeng
 * @Date: 2020-02-01 17:24:44
 * @Last Modified by: zhang zhipeng
 * @Last Modified time: 2021-01-12 17:21:02
 */

import {
  deepMerge,
  extend
} from '@/utils/request/utils.js'
import Request from '@/utils/request/core/request.js'
import defaults from '@/utils/request/defaults.js'
import CancelToken from '@/utils/request/core/cancelToken.js'
import Mock from '@/utils/request/core/Mock.js'
import graphQL from '@/utils/request/core/graphQL.js'

function createInstance(config) {
  const context = new Request(config)
  const instance = Request.prototype.request.bind(context)
  extend(instance, context)
  return instance
}

const request = createInstance(defaults)

request.create = function(config) {
  return createInstance(deepMerge(defaults, config))
}

request.CancelToken = CancelToken
request.Mock = Mock
request.graphQL = graphQL

export default request
