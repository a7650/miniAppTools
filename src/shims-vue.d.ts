import Vue from 'vue'
import moment = require('moment')

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    /**
     * 该页面是否需要权限
     * 如果为true，则在未登录情况下访问会跳转到登录页
     *
     */
    needAuth: boolean
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $moment: typeof moment
    $setStorage: (key: string | undefined, data: any) => void
    $getStorage: (key: string | undefined, options: { clear: boolean }) => any
    $toast: (title: string, duration?: number, icon?: string) => void
    $showLoading: (title?: string, mask?: boolean) => void
    $hideLoading: () => void
    _router: {
      push(config: RouterConfig): void
      replace(config: RouterConfig): void
      back(delta: number): void
      switchTab(config: RouterConfig): void
      reLaunch(config: RouterConfig): void
    }
    $uuid: () => string
    $withLoading: (
      fn: () => Promise<any>,
      loadingMessage: string
    ) => Promise<any>
    /**设备Id */
    $deviceId: string
    /**当前环境名称 */
    $envName: 'development' | 'production' | 'testing' | 'uat'
    /**环境变量 */
    $env: {
      VERSION: string
      PLATFORM_NAME: string
      PREVIEW: boolean
      API_BASE_URL: string
    }
    $css: {
      colorTheme: string
    }
    /**获取页面实例 */
    $getPageInstance: (delta: number) => any
  }

  type RouterConfig =
    | (NavigateToOptions & {
        params: Record<string, string | number>
      })
    | string

  interface NavigateToOptions {
    /**
     * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
     */
    url: string | string
    path: string | string
    /**
     * 窗口显示的动画类型
     * - auto: 自动选择动画效果
     * - none: 无动画效果
     * - slide-in-right: 从右侧横向滑动效果
     * - slide-in-left: 左侧横向滑动效果
     * - slide-in-top: 从上侧竖向滑动效果
     * - slide-in-bottom: 从下侧竖向滑动效果
     * - fade-in: 从透明到不透明逐渐显示效果
     * - zoom-out: 从小到大逐渐放大显示效果
     * - zoom-fade-out: 从小到大逐渐放大并且从透明到不透明逐渐显示效果
     * - pop-in: 从右侧平移入栈动画效果
     */
    animationType?:
      | 'auto'
      | 'none'
      | 'slide-in-right'
      | 'slide-in-left'
      | 'slide-in-top'
      | 'slide-in-bottom'
      | 'fade-in'
      | 'zoom-out'
      | 'zoom-fade-out'
      | 'pop-in'
    /**
     * 窗口显示动画的持续时间，单位为 ms
     */
    animationDuration?: number
    /**
     * 页面间通信接口，用于监听被打开页面发送到当前页面的数据
     */
    events?: NavigateToOptionEvents
    /**
     * 接口调用成功的回调函数
     */
    success?: (result: any) => void
    /**
     * 接口调用失败的回调函数
     */
    fail?: (result: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (result: any) => void
  }

  interface NavigateToOptionEvents {
    /**
     * 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
     */
    acceptDataFromOpenedPage?: (result: any) => void
  }
}
