<template>
  <div class="page-container">
    <!-- <ChatAI /> -->
    <!-- <div class="wrapper">
      <div class="link">
        <a href="https://heydesign.systems/" target="_blank">新手设计系统资料库</a>
      </div>

      <div class="link">
        <a href="https://andreasbm.github.io/web-skills/" target="_blank">互联网技能树</a>
      </div>
    </div> -->
    
  </div>
</template>

<script setup lang="ts">
// import ChatAI from './ChatAI.vue'
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;
  .wrapper {
    display: grid;
    height: 100%;
    justify-content: center;
    gap: 10px;
    align-content: center;

    .link {
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 10px;

      &:hover {
        background: #ccc;
      }
    }
  }
}
</style>
