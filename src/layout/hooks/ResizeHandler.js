import { onBeforeMount, onMounted, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export const useResizeHandler = () => {
    const store = useStore()
    const route = useRoute()
    // const isMobile = () => {
    //     return window.innerWidth < WIDTH
    // }

    // const resizeHandler = () => {
    //     if (isMobile()) {
    //         store.dispatch('app/closeSideBar', { withoutAnimation: false })
    //     }
    // }
    const $_isMobile = () => {
        const rect = body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }
    const $_resizeHandler = () => {
        if (!document.hidden) {
            const isMobile = $_isMobile()
            store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

            if (isMobile) {
                store.dispatch('app/closeSideBar', { withoutAnimation: true })
            }
        }
    }

    watch(route, (newRoute, oldRoute) => {
        if (store.getters.device === 'mobile' && store.getters.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    })

    onBeforeMount(() => {
        // resizeHandler()
        window.addEventListener('resize', $_resizeHandler)
    })

    onMounted(() => {
        const isMobile = $_isMobile()
        if (isMobile) {
            store.dispatch('app/toggleDevice', 'mobile')
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', $_resizeHandler)
    })
}