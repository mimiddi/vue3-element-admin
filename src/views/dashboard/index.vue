<template>
  <div>dashboard</div>
  <input v-model="t" />
  <el-button>11</el-button>
</template>

<script>
import { defineComponent, ref } from "vue";
// https://github.com/huzhushan/vue3-element-admin 页面缓存可参考项目
// https://juejin.cn/post/6978772143748153381 第二种缓存方式
export default defineComponent({
  activated() {
    // this.t = ""; // 缓存页面部分数据重置
  },
  // 清除缓存
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  setup() {
    const t = ref("");
    return {
      t,
    };
  },
});
</script>

<style scoped>
</style>
