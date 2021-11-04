import { onBeforeMount, onBeforeUnmount } from 'vue'
// import store from '@/store'
import { useStore, mapGetters } from 'vuex'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export const useResizeHandler = () => {
    const store = useStore()

    const isMobile = () => {
        return window.innerWidth < WIDTH
    }

    const resizeHandler = () => {
        if (isMobile()) {
            store.dispatch('app/closeSideBar', { withoutAnimation: false })
        }
    }

    onBeforeMount(() => {
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandler)
    })
}



// // export default {
// //   watch: {
// //     $route(route) {
// //       if (this.device === 'mobile' && this.sidebar.opened) {
// //         store.dispatch('app/closeSideBar', { withoutAnimation: false })
// //       }
// //     }
// //   },
// //   beforeMount() {
// //     window.addEventListener('resize', this.$_resizeHandler)
// //   },
// //   beforeDestroy() {
// //     window.removeEventListener('resize', this.$_resizeHandler)
// //   },
// //   mounted() {
// //     const isMobile = this.$_isMobile()
// //     if (isMobile) {
// //       store.dispatch('app/toggleDevice', 'mobile')
// //       store.dispatch('app/closeSideBar', { withoutAnimation: true })
// //     }
// //   },
// //   methods: {
// //     // use $_ for mixins properties
// //     // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
// //     $_isMobile() {
// //       const rect = body.getBoundingClientRect()
// //       return rect.width - 1 < WIDTH
// //     },
// //     $_resizeHandler() {
// //       if (!document.hidden) {
// //         const isMobile = this.$_isMobile()
// //         store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

// //         if (isMobile) {
// //           store.dispatch('app/closeSideBar', { withoutAnimation: true })
// //         }
// //       }
// //     }
// //   }
// // }


// import { onBeforeMount, onBeforeUnmount /*watch*/ } from 'vue'
// // import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'

// const WIDTH = 768
// export const useResizeHandler = () => {
//   const store = useStore()
//   // const router = useRouter();
//   // const route = router.currentRoute;

//   const isMobile = () => {
//     return window.innerWidth < WIDTH
//   }

//   const resizeHandler = () => {
//     if (isMobile()) {
//       store.commit('app/setDevice', 'mobile')
//       store.commit('app/setCollapse', 1)
//     } else {
//       store.commit('app/setDevice', 'desktop')
//       store.commit('app/setCollapse', 0)
//     }
//   }

//   onBeforeMount(() => {
//     resizeHandler()
//     window.addEventListener('resize', resizeHandler)
//   })

//   onBeforeUnmount(() => {
//     window.removeEventListener('resize', resizeHandler)
//   })

//   // // 监听路由的时候不能使用useRoute获取路由，否则会有警告
//   // watch(route, () => {
//   //   if (store.state.app.device === 'mobile' && !store.state.app.sidebar.collapse) {
//   //     store.commit('app/setCollapse', 1)
//   //   }
//   // })
// }
