<template>
  <template v-if="icon">
    <i v-if="isElIcon" class="sub-el-icon" :class="{ icon }" />
    <svg-icon v-else :icon-class="icon" />
  </template>
  <slot name="title">
    <span>{{ title }}</span>
  </slot>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Item",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { icon, title } = props;
    const isElIcon = icon.includes("el-icon");
    return {
      icon,
      isElIcon,
      title,
    };
  },
});
// export default {
//   name: 'MenuItem',
//   functional: true,
//   props: {
//     icon: {
//       type: String,
//       default: ''
//     },
//     title: {
//       type: String,
//       default: ''
//     }
//   },
//   render(h, context) {
//     const { icon, title } = context.props
//     const vnodes = []

//     if (icon) {
//       if (icon.includes('el-icon')) {
//         vnodes.push(<i class={[icon, 'sub-el-icon']} />)
//       } else {
//         vnodes.push(<svg-icon icon-class={icon}/>)
//       }
//     }

//     if (title) {
//       vnodes.push(<span slot='title'>{(title)}</span>)
//     }
//     return vnodes
//   }
// }
</script>

<style scoped>
.svg-icon {
  margin-right: 16px;
}

.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
