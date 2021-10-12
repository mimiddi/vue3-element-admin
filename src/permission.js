import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { ElMessage } from 'element-plus'
// import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login', '/404']
const hasToken = false

router.beforeEach(async(to, from) => {
  // start progress bar
  NProgress.start()
  // console.info(to, from)

  if (hasToken) {
    if (to.path === '/login') {
      router.replace({ path: '/' })
      // router.redirect({ path: '/' })
    } else {
      const hasRoles = false // todo roles
      if (hasRoles) {
        access()
      } else {
        try {
          access()
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
