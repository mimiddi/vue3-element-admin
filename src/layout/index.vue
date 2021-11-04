<template>
  <!-- <div :class="classObj" class="app-wrapper">
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
  </div> -->
  <sidebar class="sidebar-container" />
    <app-main />
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex"
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
// import AppMain from "./components/AppMain.vue";
import { useResizeHandler } from './hooks/ResizeHandler'

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
</style>