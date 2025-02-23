<template>
  <div id="messageContainer">{{ content }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref('')

// // 初始化 EventSource，连接到后端的 SSE 接口
// const eventSource = new EventSource('http://localhost:8080/api/ai/chatStreamWeb?msg=介绍一下 vue3')

// // 监听事件错误
// eventSource.onerror = function (err) {
//   console.error('Error occurred:', err)
//   // 关闭连接
//   eventSource.close()
// }

// // 监听流式数据
// eventSource.addEventListener('message', function (event) {
//   content.value += event.data
//   console.log('Custom Event Data:', event.data)
// })
</script>

<style lang="less" scoped>
#messageContainer {
  padding: 10px;
  border: 1px solid #ccc;
  max-height: 300px;
  overflow-y: auto;
  background-color: #f9f9f9;
}
</style>
