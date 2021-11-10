<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, ref } from "vue";
import screenfull from "screenfull";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Screenfull",
  setup() {
    const isFullscreen = ref(false);

    const change = () => {
      isFullscreen.value = screenfull.isFullscreen;
    };
    if (screenfull.isEnabled) {
      screenfull.on("change", change);
    }
    onBeforeUnmount(() => {
      if (screenfull.isEnabled) {
        screenfull.off("change", change);
      }
    });

    const click = () => {
      if (!screenfull.isEnabled) {
        ElMessage.warning({
          message: "你的浏览器不支持全屏展开",
        });
        return false;
      }
      screenfull.toggle();
    };

    return {
      isFullscreen,
      click,
    };
  },
});
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
