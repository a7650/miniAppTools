import ENV from '@/env'
import request from './config'
import { processHeaders } from './config'

const createUploadFunction = (extendOptions) => {
  return (options) => {
    const header = processHeaders()
    const baseOptions = {
      url: `${ENV.API_BASE_URL}/resource/upload`
    }
    return uni.uploadFile({
      name: 'file',
      ...baseOptions,
      header,
      ...extendOptions,
      ...options
    })
  }
}

/**
 * 上传图片
 */
export const uploadImg = createUploadFunction({ type: 'image' })

/**
 * 上传视频
 */
export const uploadVideo = createUploadFunction({ type: 'video' })
