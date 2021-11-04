// import { createApp } from 'vue'
import { createStore } from 'vuex'
import getters from './getters'

// createApp.use(Vuex)

// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)
//
// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})


// vite的import.meta.globEager 取代 webpack的require.context 的作用
// const modulesFiles = import.meta.glob('./modules/*.js')
const modulesFiles = import.meta.globEager('./modules/*.js')

// const modulesFilesKeys = Object.keys(modulesFiles)
// const modules = modulesFilesKeys.reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace('modules/', '')
//   const value = modulesFiles[modulePath]
//   modules[moduleName] = value.default
//   return modules
// }, {})

const modules = Object.entries(modulesFiles).reduce((modules, [path, mod]) => {
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = mod.default
  return modules
}, {})

const store = createStore({
  modules,
  getters
})

export default store
