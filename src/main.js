import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import router from './router/index'
import store from './store'

import '@/assets/styles/index.scss' // global css

// element-ui
// import ElementPlus from 'element-plus' // 全局引入
// import { ElButton, ElContainer } from 'element-plus' // 按需引入

/**
 * 第三种方案，自动按需引入，需在 vite.config.js 中的 plugins 配置 Components
 * import Components from 'unplugin-vue-components/vite'
   import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

   Components({
      resolvers: [ElementPlusResolver()],
   })
 */
import './assets/styles/element-variables.scss'
import 'element-plus/dist/index.css'

// import './icons' // icon
// 引入svg图标注册脚本
import 'vite-plugin-svg-icons/register'

// 注册全局组件
import * as Components from './global-components'
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

import './permission' // permission control

app.use(router)
app.use(store)

// 全局引入
// app.use(ElementPlus)

// 按需引入
// app.use(ElButton)
//   .use(ElContainer)

app.mount('#app')
