<template>
  <div class="m-4 text-center">
    <Input
      ref="inputRef"
      v-if="isEditor"
      v-model:value="titleValue"
      class="w-52"
      placeholder="请输入标题"
      @blur="inputBlur"
    />
    <div v-else class="text-sm font-mono">
      <span class="mr-3">{{ titleValue || cacheTitle }}</span>
      <span class="icon-[uil--edit] cursor-pointer align-middle mt-[-3px]" @click="transformEditor"></span>
    </div>
  </div>
  <Editor />
</template>

<script lang="ts" setup>
import Editor from '@/components/Editor/index.vue'
import { Input } from 'ant-design-vue'

import { nextTick, ref } from 'vue'

const inputRef = ref()
const titleValue = ref('')
const cacheTitle = ref('请输入标题')
const isEditor = ref(false)

const inputBlur = () => {
  if (titleValue.value.trim()) {
    cacheTitle.value = titleValue.value
  } else {
    titleValue.value = ''
    cacheTitle.value = '请输入标题'
  }
  isEditor.value = false
}

const transformEditor = async () => {
  isEditor.value = true
  await nextTick()
  inputRef.value?.focus()
}
</script>

<style lang="less" scoped>
.ant-input {
  width: 200px;

  &:focus {
    width: 500px;
    transition: all 0.3s ease; /* 平滑过渡 transform */
  }
}
</style>
