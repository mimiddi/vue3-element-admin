import { createApp } from 'vue'
import 'vite-plugin-svg-icons/register' // 注意在 vite.config.js 的 plugins 中配置 viteSvgIcons
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component
import App from '../App.vue'

const app = createApp(App)

// register globally
app.component('svg-icon', SvgIcon)
