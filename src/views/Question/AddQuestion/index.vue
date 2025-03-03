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
      <div v-else class="text-sm font-mono flex items-center justify-center translate-y-[8px]">
        <div class="text-[#000] mr-2 max-w-[300px] truncate">
          {{ titleValue || cacheTitle }}
        </div>
        <Icon
          icon="mage:edit"
          class="cursor-pointer align-middle text-[#000] mt-[-3px] text-xl hover:text-[#0d9488]"
          @click="transformEditor"
        />
      </div>
    </div>
    <!-- 编辑器 -->
    <div class="editor-wrapper">
      <Editor @save-handler="saveQuestion" :defaultValue="defaultValue" />
    </div>
  </Spin>
</template>

<script lang="ts" setup>
import Editor from '@/components/Editor/index.vue'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'
import { addInterviewQuestion, updateInterviewQuestion } from '@/api'
import { Input, message, Spin } from 'ant-design-vue'

import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface Question {
  id: number
  title: string
  type: string
  answer: string
  createdAt?: string
  updatedAt: string
}

const QUESTION_LOCAL_ID = 'question-detail-info'

const inputRef = ref()
const defaultValue = ref('')

const route = useRoute()
const titleValue = ref('')
const cacheTitle = ref('请输入标题')
const isEditor = ref(false)
const submitLoading = ref(false)
const detailInfo = ref<Partial<Question>>({})

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

const saveQuestion = async (editorValue: string) => {
  if (!titleValue.value) return message.warn('请输入标题')
  if (!editorValue || editorValue === '\n') return message.warn('请输入答案')

  submitLoading.value = true
  try {
    if (route.query.state === 'edit') {
      await updateInterviewQuestion({
        id: detailInfo.value.id,
        title: titleValue.value,
        answer: editorValue,
        type: detailInfo.value.type,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      return message.success('修改成功')
    }

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

onBeforeUnmount(() => {
  localStorage.removeItem(QUESTION_LOCAL_ID)
})

onMounted(() => {
  const hasDetailInfo = localStorage.getItem(QUESTION_LOCAL_ID)
  if (hasDetailInfo) {
    try {
      detailInfo.value = JSON.parse(hasDetailInfo)
      titleValue.value = detailInfo.value.title as string
      defaultValue.value = detailInfo.value.answer as string
    } catch (error) {
      console.log('error', error)
    }
  }
})
</script>

<style lang="less" scoped>
.ant-input {
  width: 200px;

  &:focus {
    width: 500px;
    transition: all 0.3s ease; /* 平滑过渡 transform */
  }

  @media (max-width: 768px) {
    &:focus {
      width: 200px;
      transition: all 0.3s ease; /* 平滑过渡 transform */
    }
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
