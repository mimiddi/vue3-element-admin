<template>
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component :is="Component" :key="key" />
    </keep-alive>
  </router-view> -->
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "AppMain",
  setup() {
    const store = useStore();
    const route = useRoute();
    const cachedViews = computed(() => store.state.tagsView.cachedViews);
    const key = computed(() => route.path);

    return {
      cachedViews,
      key,
    };
  },
});
</script>
