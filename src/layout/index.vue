<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
  <!-- <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <app-main />
  </div> -->
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore, mapGetters } from "vuex";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
// import AppMain from "./components/AppMain.vue";
import { useResizeHandler } from "./hooks/ResizeHandler";

export default defineComponent({
  name: "layout",
  components: {
    Sidebar,
    // Topbar,
    // Menus,
    // Tagsbar,
    // Breadcrumbs,
    AppMain,
  },
  setup() {
    useResizeHandler();
    const store = useStore();

    const siderbar = store.getters.siderbar
    const siderbar2 = store.state.app.device
    // console.info(store.getters.device, siderbar, siderbar2, 1111111111, ...mapGetters['device'])
    
    // const collapse = computed(() => !!store.state.app.sidebar.collapse)
    // const device = computed(() => store.state.app.device)

    // sidebar: state => state.app.sidebar,
    //   device: state => state.app.device,
    //   showSettings: state => state.settings.showSettings,
    //   needTagsView: state => state.settings.tagsView,
    //   fixedHeader: state => state.settings.fixedHeader

    // const defaultSettings = computed(() => store.state.layoutSettings);
    // const isFluid = computed(() => defaultSettings.value.layout.isFluid);
    // const isTopbarFixed = computed(() => defaultSettings.value.topbar.isFixed);
    // const isMenusShow = computed(() => defaultSettings.value.menus.isShow);
    // const isHorizontalMenu = computed(
    //   () => defaultSettings.value.menus.mode === "horizontal"
    // );
    // const isBreadcrumbsShow = computed(
    //   () => isHorizontalMenu.value && defaultSettings.value.breadcrumbs.isShow
    // );
    // const paddingFlag = ref(true);
    // const handleBreadcrumbsChange = (boo) => {
    //   paddingFlag.value = boo;
    // };

    return {
      //   isFluid,
      //   isTopbarFixed,
      //   isMenusShow,
      //   isHorizontalMenu,
      //   isBreadcrumbsShow,
      //   paddingFlag,
      //   handleBreadcrumbsChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>