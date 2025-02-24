<template>
  <div :style="style">
    <slot v-bind="metadata.attrs" />
  </div>
</template>

<script lang="ts" setup>
import { metadata, proxyEl } from '@/composables/floating'
import { useElementBounding } from '@vueuse/core'
import { computed, reactive, type StyleValue } from 'vue'

const rect = reactive(useElementBounding(proxyEl))

const style = computed((): StyleValue => {
  return {
    transition: 'all .5s ease-in-out',
    position: 'fixed',
    left: `${rect?.left ?? 0}px`,
    top: `${rect?.top ?? 0}px`
    // width: `${rect.value?.width}px`,
    // height: `${rect.value?.height}px`
  }
})
</script>
