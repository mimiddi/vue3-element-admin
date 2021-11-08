import { constantRoutes } from "@/router"
import { routeMap, routeChildrenMap } from '@/router/modules/dynamicRoutes' // 根据权限获取动态路由

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

export function createDynamicRoutes({ type, access }) {
  let router
  if (type === 'admin') {
    // 超级管理员
    const values = Object.values(routeMap)
    router = values.map(v => {
      if (v.children) {
        let children = []
        v.children.forEach(iv => {
          // if (typeof iv === 'string') { if (routerChildrenMap[iv]) { children = children.concat(routerChildrenMap[iv]) } }
          if (typeof iv === 'string') {
            children = children.concat(routeChildrenMap[iv])
          } else if (typeof iv === 'object') { children.push(iv) }
        })
        v.children = children
      }
      return v
    })
  } else if (+type === 'visitor') {
    // 普通管理员
    const keys = Object.keys(routeMap)
    router = keys.filter(v => {
      return access.indexOf(v) >= 0
    }).map(v => {
      return routeMap[v]
    }).map(v => {
      if (v.children) {
        let children = []
        v.children.forEach(iv => {
          if (typeof iv === 'string') {
            if (access.indexOf(iv) >= 0) { children = children.concat(routeChildrenMap[iv]) }
          } else if (typeof iv === 'object') { children.push(iv) }
        })
        v.children = children
      }
      return v
    })
  }

  return router
}

const state = {
  routes: [],
  // addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // state.addRoutes = routes
    state.routes = constantRoutes.concat(routes) // 用来生成菜单的
  }
}

const actions = {
  generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      const accessedRoutes = createDynamicRoutes(role) || []
      // if (role.type === 1) {
      //   // 超管
      // } else {
      //   // 普通管理员  
      // }
      // 根据登录角色加载路由
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
