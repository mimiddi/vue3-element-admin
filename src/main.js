import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import router from './router/index'
import store from './store'

import '@/assets/styles/index.scss' // global css

/**
 * element-ui
 */
import ElementPlus from 'element-plus' // 全局引入
// import { ElButton, ElContainer } from 'element-plus' // 按需引入
/**
 * 第三种方案，自动按需引入，需在 vite.config.js 中的 plugins 配置 Components
 * ---自定义主题不好使
 * import Components from 'unplugin-vue-components/vite'
   import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

   Components({
      resolvers: [ElementPlusResolver()],
   })
 */
// 引入中文模块 实际上App.vue有引入可以不需要
// import 'dayjs/locale/zh-cn'
// import locale from 'element-plus/lib/locale/lang/zh-cn'

/**
 * element ui css
 */
// import 'element-plus/dist/index.css' // default
import './assets/styles/element-variables.scss' // custom

/**
 * svg
 */
// import './icons' // icon
// 引入svg图标注册脚本
import 'vite-plugin-svg-icons/register'

// 注册全局组件
import * as Components from './global-components'
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component)
})

import './permission' // permission control

// 按需引入
// app.use(ElButton)
//   .use(ElContainer)

app
  // ElementPlus 全局引入
  // .use(ElementPlus, { locale })
  .use(ElementPlus, { size: 'small', zIndex: 3000 })
  .use(store)
  .use(router)
  .mount('#app')
