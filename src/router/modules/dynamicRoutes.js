import Layout from '@/layout/index.vue'

// 匹配所有路径 /:pathMatch(.*)* 或 /:pathMatch(.*) 或 /:catchAll(.*)
const pathMatch = { path: '/:pathMatch(.*)*', redirect: '/404', name: 'NotFound', hidden: true }

export const routeMap = {
    'table': {
        path: 'table',
        component: Layout,
        children: ['table/index']
    },
    // 'detail': {

    // },
    // 'table2': {

    // },
    // 'table3': {

    // },
    // 'permission': {

    // },
    pathMatch
}

export const routeChildrenMap = {
    'table/index': [
        {
            path: '',
            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
            name: 'Table',
            meta: { title: 'Table', icon: 'dashboard', affix: true }
        }
    ]
}

// function createDynamicRouter(type, access) {
//     let router
//     if (type === 1) {
//         const values = Object.values(routerMap)
//         router = values.map(v => {
//             if (v.children) {
//                 let children = []
//                 v.children.forEach(iv => {
//                     // if (typeof iv === 'string') { if (routerChildrenMap[iv]) { children = children.concat(routerChildrenMap[iv]) } }
//                     if (typeof iv === 'string') {
//                         children = children.concat(routerChildrenMap[iv])
//                     } else if (typeof iv === 'object') { children.push(iv) }
//                 })
//                 v.children = children
//             }
//             return v
//         })
//     } else {
//         const keys = Object.keys(routerMap)
//         router = keys.filter(v => {
//             return access.indexOf(v) >= 0
//         }).map(v => {
//             return routerMap[v]
//         }).map(v => {
//             if (v.children) {
//                 let children = []
//                 v.children.forEach(iv => {
//                     if (typeof iv === 'string') {
//                         if (access.indexOf(iv) >= 0) { children = children.concat(routerChildrenMap[iv]) }
//                     } else if (typeof iv === 'object') { children.push(iv) }
//                 })
//                 v.children = children
//             }
//             return v
//         })
//     }

//     return router
// }

// export default createDynamicRouter