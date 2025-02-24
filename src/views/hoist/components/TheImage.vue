<template>
  <div class="overflow-hidden transition-all">
    <img
      v-if="a"
      @click="a = !a"
      src="https://plus.unsplash.com/premium_photo-1738849384078-590f9060a80c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
    />
    <img
      v-else
      @click="a = !a"
      src="https://images.unsplash.com/photo-1739826090898-a6871135ee92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const a = ref(false)
</script>
