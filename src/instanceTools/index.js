import mixin from './mixin'
import prototype from './prototype'

export default {
  install(Vue) {
    prototype(Vue)

    Vue.mixin(mixin)
  }
}
