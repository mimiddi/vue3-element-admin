<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// 国际化支持
// import zhCn from "element-plus/lib/locale/lang/zh-cn";
// const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";
// import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  // components: {
  //   [ElConfigProvider.name]: ElConfigProvider,
  // },
  data() {
    return {
      locale: zhCn,
    };
  },
});
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
