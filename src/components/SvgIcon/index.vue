<script setup>
  // <!-- use icon-class to setting name; use `class-name` to customizing class -->
  // <svg-icon icon-class="password"  class-name='custom-class' />
  import {computed} from 'vue'

  const props = defineProps({
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#889aa4'
    }
  })
  const {iconClass, className} = props

  const iconName = computed(() => `#icon-${iconClass}`)
  const svgClass = computed(() => {
    if (className) {
      return `svg-icon ${className}`
    } else {
      return 'svg-icon'
    }
  })
</script>

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color"/>
  </svg>
</template>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    /* vertical-align: -0.15em; */
    fill: currentColor;
    /* stroke: currentColor; */
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>
