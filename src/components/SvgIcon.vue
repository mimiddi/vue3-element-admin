<script setup>
// <!-- use icon-class to setting name; use `class-name` to customizing class -->
// <svg-icon icon-class="password"  class-name='custom-class' />
import { computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
const { iconClass, className } = props

const isExternal = computed(() => /^(https?:|mailto:|tel:)/.test(iconClass))
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
    mask: `url(${iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
  }
})
</script>

<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 10em;
  height: 10em;
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
