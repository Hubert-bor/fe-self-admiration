<template>
  <nav class="flex px-8 py-4 mb-4 font-black gray-400/10 gap-2 items-center border-b-1 border-[#9ca3af1a]">
    <RouterLink to="/" class="flex gap-2 items-center font-normal leading-4">
      <img src="/src/assets/logo.svg" class="h-10" />
      <div font-mono text-left leading-1em mr6 text-sm>Vue<br />Starport</div>
    </RouterLink>

    <div class="flex-auto" />

    <div class="flex gap-4 items-center leading-4">
      <button
        class="icon-btn !outline-none p-1"
        :class="isDebug ? '!text-red bg-red:10 rounded' : ''"
        @click="toggleDebug()"
      >
        <div class="icon-[carbon--debug]" />
      </button>

      <a
        class="icon-btn icon-[ion--logo-github] w-[1.3em] h-[1.3em]"
        rel="noreferrer"
        href="https://github.com/antfu/vue-starport"
        target="_blank"
        title="GitHub"
      />

      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" class="icon-[solar--moon-outline]" />
        <div v-else class="icon-[flowbite--sun-outline]" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { isDark, isDebug, toggleDark, toggleDebug } from '../composables/dark'
</script>
