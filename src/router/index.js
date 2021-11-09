import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    // name: 'Dashboard',
    component: Layout,
    // meta: { title: 'dashboard', icon: 'dashboard', affix: true },
    // component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
    // name: 'Dashboard',
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/table',
    component: Layout,
    name: 'Table',
    meta: { title: 'table', icon: 'dashboard', access: ['table/index', 'table/detail'] },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        name: 'TableIndex',
        // meta: { title: 'table', icon: 'dashboard', role: { 'admin': [], 'visitor': ['table/index'] } }
        meta: { title: 'tableList', icon: 'dashboard', access: ['table/index'] }
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        name: 'TableDetail',
        // meta: { title: 'table', icon: 'dashboard', role: { 'admin': [], 'visitor': ['table/index'] } }
        meta: { title: 'tableDetail', icon: 'dashboard', access: ['table/detail'] }
      }
    ]
  },

  // 匹配所有路径 /:pathMatch(.*)* 或 /:pathMatch(.*) 或 /:catchAll(.*)
  { path: '/:pathMatch(.*)*', redirect: '/404', name: 'Page404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
