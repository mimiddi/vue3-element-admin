import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import '@/styles/index.scss' // global css

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
import 'element-plus/dist/index.css'

import './icons' // icon
import './permission' // permission control

const app = createApp(App)

app.use(router)
app.use(store)

// 全局引入
// app.use(ElementPlus)

// 按需引入
// app.use(ElButton)
//   .use(ElContainer)

app.mount('#app')
