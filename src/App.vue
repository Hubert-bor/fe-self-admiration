<script setup lang="ts">
import {  RouterView } from 'vue-router'
import HomeFooter from './components/HomeFooter.vue'
</script>

<template>
  <div class="page">
    <div class="view">
      <RouterView />
    </div>
  </div>
  <HomeFooter />
  
</template>

<style scoped>
.page{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .view{
    flex: 1;
  }
}

</style>
