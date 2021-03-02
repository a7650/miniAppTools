import Toast from './toast'

let imgCount = 0

const ImgHelpers = {
  /**
   * 保存图片
   * @param {String} imagePath
   */
  saveImage(imagePath) {
    if (!imagePath) {
      return
    }
    Toast.showLoading('正在保存')
    uni.saveImageToPhotosAlbum({
      filePath: imagePath,
      success: () => {
        Toast.hideLoading()
        Toast('保存成功', 1500, 'success')
      },
      fail: (res) => {
        Toast.hideLoading()
        if (res.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
          uni.showModal({
            title: '您需要授予相册权限',
            success(res) {
              if (res.confirm) {
                uni.openSetting()
              }
            }
          })
        }
      }
    })
  },
  /**
   * 预览图片
   * @param {Array<String>|String} list 图片列表
   * @param {Number} index 要查看的图片索引
   */
  previewImage(list, index = 0) {
    if (typeof list === 'string') {
      list = [list]
    }
    uni.previewImage({
      urls: list,
      current: index
    })
  },
  /**
   * arrayBuffer转本地路径
   * @param {String} buffer
   */
  arrayBufferToPath(buffer) {
    const fsm = uni.getFileSystemManager()
    return new Promise((resolve, reject) => {
      const FILE_BASE_NAME = `buffer_to_path_${imgCount++}`
      const filePath = uni.env.USER_DATA_PATH + '/' + FILE_BASE_NAME + '.jpg'
      const clearHandler = () => {
        fsm.unlink({
          filePath
        })
      }
      uni.getSavedFileList({ // 获取文件列表
        success(res) {
          res.fileList.forEach((val) => {
            // 删除存储的垃圾数据
            uni.removeSavedFile({
              filePath: val.filePath
            })
          })
          fsm.writeFile({
            filePath,
            data: buffer,
            encoding: 'binary',
            success() {
              console.log('success', filePath)
              resolve({ clearHandler, filePath })
            },
            fail() {
              reject()
            }
          })
        }
      })
    })
  }
}

export default ImgHelpers
