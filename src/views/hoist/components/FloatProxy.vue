<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { metadata, proxyEl } from '@/composables/floating'
import { onMounted, ref, useAttrs } from 'vue'

const attrs = useAttrs()
const el = ref<HTMLElement>()

metadata.attrs = attrs

onMounted(() => {
  proxyEl.value = el.value
})
</script>
