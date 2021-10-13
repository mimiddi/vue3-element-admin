<script setup>
// <!-- use icon-class to setting name; use `class-name` to customizing class -->
// <svg-icon icon-class="password"  class-name='custom-class' />
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

// defineProps({
//   iconClass: {
//     type: String,
//     required: true
//   },
//   className: {
//     type: String,
//     default: ''
//   }
// })

const isExternal = computed(() => isExternal(iconClass))
const iconName = computed(() => `#icon-${iconClass}`)
const svgClass = computed(() => {
  if (className) {
    return 'svg-icon ' + className
  } else {
    return 'svg-icon'
  }
})
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${this.iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
  }
})


import { defineCustomElement } from 'vue'

const SvgIcon = defineCustomElement({
  // 在此提供正常的 Vue 组件选项
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: {},
  template: `
    <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
    <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
      <use :xlink:href="iconName" />
    </svg>
  `,

  // defineCustomElement 独有特性: CSS 会被注入到隐式根 (shadow root) 中
  styles: [`/* inlined css */`]
})

// 注册自定义元素
// 注册完成后，此页面上的所有的 `<my-vue-element>` 标签会被更新
customElements.define('svg-icon', SvgIcon)
</script>

<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
