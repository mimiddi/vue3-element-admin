<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
  <!-- <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <app-main />
  </div> -->
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore, mapState } from "vuex";
// import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import { AppMain, Navbar, Sidebar } from "./components";
// import AppMain from "./components/AppMain.vue";
import { useResizeHandler } from "./hooks/ResizeHandler";

export default defineComponent({
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    // Topbar,
    // Menus,
    // Tagsbar,
    // Breadcrumbs,
    AppMain,
  },
   computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    // classObj() {
    //   return {
    //     hideSidebar: !this.sidebar.opened,
    //     openSidebar: this.sidebar.opened,
    //     withoutAnimation: this.sidebar.withoutAnimation,
    //     mobile: this.device === 'mobile'
    //   }
    // }
  },
  setup() {
    useResizeHandler();
    const store = useStore();

    // computed({
    //   ...mapState({
    //     sidebar: (state) => state.app.sidebar,
    //     device: (state) => state.app.device,
    //     showSettings: (state) => state.settings.showSettings,
    //     needTagsView: (state) => state.settings.tagsView,
    //     fixedHeader: (state) => state.settings.fixedHeader,
    //   }),
    // });

    const classObj = computed(() => {
      const { sidebar, device } = store.getters;
      return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: device === "mobile",
      };
    });

    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };

    return {
      classObj,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
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