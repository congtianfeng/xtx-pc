// 通用组件全局注册
import GoodsPreview from './GoodsPreview.vue'
export default {
  install(app) {
    app.component('GoodsPreview', GoodsPreview)
  }
}
