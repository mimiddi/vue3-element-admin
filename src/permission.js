import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { ElMessage } from 'element-plus'
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from) => {
  document.title = getPageTitle(!!to.meta && to.meta.title)

  // start progress bar
  NProgress.start()

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      router.replace({ path: '/' })
      // router.redirect({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.info(hasRoles)
      if (hasRoles) {
        access()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // dynamically add accessible routes
          accessRoutes.forEach(route => router.addRoute(route))

          // access()
          return to.fullPath // 添加动态路由后，必须加这一句触发重定向，否则会404
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          router.replace({ path: `/login`, query: { redirect: to.path } })
          return false
        }
      }
      access()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      access()
    } else {
      router.replace({ path: `/login`, query: { redirect: to.path } })
      return false
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function access() {
  NProgress.done()
  return true
}
//
// function replace(path) {
//   router.replace(path)
//   return false
// }
