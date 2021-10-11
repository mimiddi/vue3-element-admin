import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue')
  },

  // 匹配所有路径 /:pathMatch(.*)* 或 /:pathMatch(.*) 或 /:catchAll(.*)
  { path: '/:pathMatch(.*)*', redirect: '/404', name: 'NotFound', hidden: true }
]

export const asyncRoutes = [

  // 匹配所有路径 /:pathMatch(.*)* 或 /:pathMatch(.*) 或 /:catchAll(.*)
  { path: '/:pathMatch(.*)*', redirect: '/404', name: 'Page404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
