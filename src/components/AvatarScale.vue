<template>
  <div class="flex justify-center mb-5 relative">
    <div class="border-solid border-black rounded-full absolute w-[50px] h-[50px]" />
    <img :src="imgSrc()" class="w-[50px] h-[50px]" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const imgSrc = () => {
  const url = new URL(
    `../assets/svgIcon/${(route.query.framework as string).toLocaleLowerCase()}.svg`,
    import.meta.url
  )
  return url.href
}
</script>
