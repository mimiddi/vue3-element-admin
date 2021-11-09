<template>
  <!-- <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div> -->
  <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false" -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuItemBg"
      :text-color="variables.menuTextColor"
      :unique-opened="false"
      :active-text-color="variables.menuActiveTextColor"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
// import { mapGetters } from "vuex";
// import Logo from './Logo'
// import SidebarItem from './SidebarItem'
// import variables from '@/styles/variables.scss'

import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import SidebarItem from "./SidebarItem.vue";

import config from "./config/menu.module.scss";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarItem,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const { meta, path } = route;
    const { sidebar } = store.getters;

    const activeMenu = computed(() => {
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    const permission_routes = computed(() => {
      return store.getters.permission_routes;
    });

    const isCollapse = computed(() => {
      return !sidebar.opened;
    });

    return {
      activeMenu,
      permission_routes,
      isCollapse,
      variables: computed(() => config),
    };
  },
  //   components: { SidebarItem, Logo },
  //   computed: {
  //     ...mapGetters([
  //       'permission_routes',
  //       'sidebar'
  //     ]),
  //     activeMenu() {
  //       const route = this.$route
  //       const { meta, path } = route
  //       // if set path, the sidebar will highlight the path you set
  //       if (meta.activeMenu) {
  //         return meta.activeMenu
  //       }
  //       return path
  //     },
  //     showLogo() {
  //       return this.$store.state.settings.sidebarLogo
  //     },
  //     variables() {
  //       return variables
  //     },
  //     isCollapse() {
  //       return !this.sidebar.opened
  //     }
  //   }
});
</script>