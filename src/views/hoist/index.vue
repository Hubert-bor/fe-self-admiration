<template>
  <div class="text-center">
    <div class="m-3">Index</div>
    <div>
      <router-link class="text-sm btn" to="/foo"> Foo </router-link>
      <router-link class="text-sm btn" to="/bar"> Bar </router-link>
    </div>
  </div>
  <TheImageProxy class="w-50 h-50 rounded-xl" />
</template>

<script lang="ts" setup>
import { TheImageProxy } from '@/composables/image'
</script>
