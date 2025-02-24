<template>
  <div class="text-center">
    <div class="m-3">Index</div>
    <div>
      <router-link class="text-sm btn" to="/foo"> Go </router-link>
    </div>
  </div>
  <FloatProxy class="w-[50px] h-[50px] rounded-xl" />
</template>

<script lang="ts" setup>
import FloatProxy from '@/views/hoist/components/FloatProxy.vue'
</script>
