import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import '@/styles/index.scss' // global css

// element-ui
// import ElementPlus from 'element-plus' // 全局引入
// import { ElButton, ElContainer } from 'element-plus' // 按需引入
import 'element-plus/dist/index.css'

import './icons' // icon
import './permission' // permission control

const app = createApp(App)

app.use(router)
app.use(store)

// app.use(ElementPlus)
// app.use(ElButton)
//   .use(ElContainer)

app.mount('#app')
