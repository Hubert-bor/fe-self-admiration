<template>
  <div class="page">
    <TheNav />
    <div class="view">
      <ConfigProvider :theme="theme">
        <RouterView />
      </ConfigProvider>
      <!-- <TheImageContainer /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNav from './components/TheNav.vue'
import { ConfigProvider } from 'ant-design-vue'
// import { TheImageContainer } from './composables/image'
import theme from './utils/theme'
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  color: #fff;

  .view {
    margin-top: 73px;
  }

  :deep([class^='icon-']) {
    font-size: 1.3em;
    border-color: #fff;

    &:hover {
      /* color: #0d9488; */
      color: #fff;
      cursor: pointer;
    }
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
