<template>
  <div class="flex justify-center mb-5 relative">
    <div class="border-solid border-black rounded-full absolute w-[50px] h-[50px]" />
    <img
      :src="`/src/assets/svgIcon/${(route.query.framework as string).toLocaleLowerCase()}.svg`"
      class="w-[50px] h-[50px]"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
