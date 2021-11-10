<template>
  <div>dashboard</div>
  <input v-model="t" />
  <el-button>11</el-button>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "Dashboard",
  // activated() {
  //   // this.t = ""; // 缓存页面部分数据重置
  // },
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
