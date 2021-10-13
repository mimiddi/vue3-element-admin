import { createApp } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'// svg component
import App from '../App.vue'

const app = createApp(App)

// register globally
app.component('svg-icon', SvgIcon)

// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

const req = import.meta.globEager('./svg/*.svg')
const requireAll = requireContext => Object.values(requireContext).map(v => {
  console.info(v)
})
requireAll(req)

console.info(Object.values(req))
