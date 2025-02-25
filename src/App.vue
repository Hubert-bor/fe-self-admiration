<template>
  <div class="page">
    <div class="view">
      <RouterView />

      <TheImageContainer />
    </div>
  </div>
  <HomeFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HomeFooter from './components/HomeFooter.vue'

import { TheImageContainer } from './composables/image'
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .view {
    flex: 1;
  }
}

:deep(.btn) {
  background-color: #45918a;
  color: white;
  border-radius: 2px;
  padding: 2px 12px;

  &:hover {
    background-color: #419c92;
  }
}
</style>
