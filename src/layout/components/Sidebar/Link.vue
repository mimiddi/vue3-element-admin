<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { computed, defineComponent } from "vue";
import { isExternal } from "@/utils/validate";

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isExternalLink = computed(() => {
      return isExternal(props.to);
    });

    const type = computed(() => {
      if (props.isExternal) {
        return "a";
      }
      return "router-link";
    });

    const linkProps = (to) => {
      if (isExternalLink.value) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to: to,
      };
    };

    return {
      linkProps,
      type
    };
  },
});
</script>
