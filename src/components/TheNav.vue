<template>
  <nav
    class="fixed top-0 left-0 right-0 z-10 flex px-8 py-4 font-black gray-400/10 gap-2 items-center border-b-1 border-[#9ca3af1a]"
  >
    <RouterLink to="/" class="flex gap-2 items-center font-normal leading-4">
      <img src="../assets/svgIcon/logo.svg" class="h-10" />
      <div class="font-mono text-left leading-1em mr-6 text-sm">Nine<br />Yangs Scripture</div>
    </RouterLink>

    <div class="flex-auto" />

    <div class="flex gap-4 items-center leading-4">
      <!-- <a
        class="icon-[ion--logo-github] icon-btn w-[1.3em] h-[1.3em]"
        rel="noreferrer"
        href="https://github.com/Hubert-bor/fe-self-admiration"
        target="_blank"
        title="GitHub"
      /> -->

      <!-- <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" class="icon-[solar--moon-outline]" />
        <div v-else class="icon-[flowbite--sun-outline] mt-[3px]" />
      </button> -->
    </div>
  </nav>
</template>

<script setup lang="ts">
// import { isDark, toggleDark } from '../composables/dark'
</script>

<style lang="less" scoped>
nav {
  background-color: #101010;
}
</style>
