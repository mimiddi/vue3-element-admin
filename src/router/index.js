/**
 * affix：固钉，tags固定不可关闭的选项
 * noCache：不缓存（注意需要页面缓存请保证页面的name与路由的name相同），
 *  添加缓存页面的方式 useStore().dispatch("tagsView/addCachedView", useRoute());
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true, noCache: true }
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
        path: '',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        name: 'TableIndex',
        // meta: { title: 'table', icon: 'dashboard', role: { 'admin': [], 'visitor': ['table/index'] } }
        meta: {
          title: 'tableList', access: ['table/index'], noCache: true // 不缓存页面
        }
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        name: 'TableDetail',
        // meta: { title: 'table', icon: 'dashboard', role: { 'admin': [], 'visitor': ['table/index'] } }
        meta: { title: 'tableDetail', access: ['table/detail'] }
      }
    ]
  },
  {
    path: '/read-pdf',
    component: Layout,
    name: 'Pdf',
    meta: { title: 'pdf', icon: 'dashboard', access: ['pdf/index'] },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/index.vue'),
        name: 'PdfIndex',
        // meta: { title: 'table', icon: 'dashboard', role: { 'admin': [], 'visitor': ['table/index'] } }
        meta: {
          title: 'pdfList', access: ['pdf/index'], noCache: true // 不缓存页面
        }
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

export const resetRouter = () => {
  asyncRoutes.forEach(route => {
    router.removeRoute(route.name)
  })
  return router
}

export default router
