<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          <!-- {{ generateTitle(item.meta.title) }} -->
          {{ item.meta.title }}
        </span>
        <!-- generateTitle(item.meta.title) -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
// import { generateTitle } from '@/utils/i18n'
import * as pathToRegexp from "path-to-regexp";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const levelList = ref(null);

    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "dashboard" } }].concat(
          matched
        );
      }

      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    };

    const isDashboard = (route) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    };

    const pathCompile = (path) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route;
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    };

    const handleLink = (item) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    };

    getBreadcrumb();
    watch(route, (newRoute) => {
      // if you go to the redirect page, do not update the breadcrumbs
      if (newRoute.path.startsWith("/redirect/")) {
        return;
      }
      getBreadcrumb();
    });

    return {
      levelList,
      handleLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
