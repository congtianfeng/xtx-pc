import './styles/common.scss'
import './styles/iconfont.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Components from './components/index.js'
import App from './App.vue'
import router from './router'
// 引入pinia数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(Components)
app.mount('#app')
