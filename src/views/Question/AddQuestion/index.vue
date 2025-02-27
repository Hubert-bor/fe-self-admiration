<template>
  <Spin size="large" :spinning="submitLoading">
    <div class="mt-4 text-center h-[48px]">
      <Input
        ref="inputRef"
        v-if="isEditor"
        v-model:value="titleValue"
        class="w-52"
        placeholder="请输入标题"
        @blur="inputBlur"
      />
      <div v-else class="text-sm font-mono flex items-center justify-center">
        <div class="mr-2 max-w-[300px] truncate">{{ titleValue || cacheTitle }}</div>
        <div
          class="icon-[uil--edit] cursor-pointer align-middle mt-[-3px]"
          @click="transformEditor"
        />
      </div>
    </div>
    <!-- 编辑器 -->
    <div class="editor-wrapper">
      <Editor @save-handler="addQuestion" />
    </div>
  </Spin>
</template>

<script lang="ts" setup>
import { addInterviewQuestion } from '@/api'
import Editor from '@/components/Editor/index.vue'
import { Input, message, Spin } from 'ant-design-vue'
import dayjs from 'dayjs'

import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const inputRef = ref()
const titleValue = ref('')
const cacheTitle = ref('请输入标题')
const isEditor = ref(false)
const submitLoading = ref(false)

/**
 * @description: 失去焦点时保存标题
 */
const inputBlur = () => {
  if (titleValue.value.trim()) {
    cacheTitle.value = titleValue.value
  } else {
    titleValue.value = ''
    cacheTitle.value = '请输入标题'
  }
  isEditor.value = false
}

/**
 * @description: 点击编辑后输入框聚焦
 */
const transformEditor = async () => {
  isEditor.value = true
  await nextTick()
  inputRef.value?.focus()
}

const addQuestion = async (editorValue: string) => {
  console.log('editorValue', editorValue)
  if (!titleValue.value) return message.warn('请输入标题')
  if (!editorValue || editorValue === '\n') return message.warn('请输入答案')

  submitLoading.value = true
  try {
    await addInterviewQuestion({
      title: titleValue.value,
      type: route.query.type as string,
      answer: editorValue,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
    message.success('添加成功')
  } finally {
    submitLoading.value = false
  }
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

:deep(.ant-spin) {
  max-height: none !important;
}

.editor-wrapper {
  height: calc(100vh - 190px);
  width: 100vw;
}
</style>
