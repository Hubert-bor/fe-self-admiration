<template>
  <Spin :spinning="getDetailLoading">
    <FloatButton tooltip="编辑" @click="goAddPage">
      <template #icon>
        <Icon icon="mage:edit" />
      </template>
    </FloatButton>
    <div class="vditor-detail-wrapper">
      <div class="text-[#000] text-center p-3 font-mono font-bold">{{ detail.title }}</div>
      <div id="vditor-detail" />
    </div>
  </Spin>
</template>

<script lang="ts" setup>
import { fetchInterviewQuestionById } from '@/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { Spin, FloatButton } from 'ant-design-vue'
import Vditor from 'vditor'
import { Icon } from '@iconify/vue'

import 'vditor/dist/index.css'

const QUESTION_LOCAL_ID = 'question-detail-info'

/**
 * @description: 如果去到添加页面，判断是否是编辑，如果是编辑就存储数据，否则不存储数据
 */
onBeforeRouteLeave((to) => {
  if (to.path === '/add' && isEdit.value) {
    try {
      localStorage.setItem(QUESTION_LOCAL_ID, JSON.stringify(detail.value))
    } catch (error) {
      console.log('error', error)
    }
  } else {
    localStorage.removeItem(QUESTION_LOCAL_ID)
  }

  return true
})

interface Question {
  id: number
  title: string
  type: string
  answer: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()
const router = useRouter()
const detail = ref<Partial<Question>>({})
const getDetailLoading = ref(false)
const isEdit = ref(false)

let vditorDetail: Vditor

/**
 * @description: 跳转到添加页面
 */
const goAddPage = () => {
  isEdit.value = true
  router.push({ path: '/add', query: { state: 'edit' } })
}

onMounted(async () => {
  getDetailLoading.value = true
  try {
    const res = await fetchInterviewQuestionById(route.query.qId as string)
    detail.value = res.data

    vditorDetail = new Vditor('vditor-detail', {
      height: 'calc(100vh - 170px)',
      // mode: 'sv',
      toolbarConfig: {
        pin: true,
        hide: true
      },
      cache: {
        enable: false
      },
      after: () => {
        vditorDetail.setValue(detail.value.answer || '')
        vditorDetail.disabled()
      }
    })
  } finally {
    getDetailLoading.value = false
  }
})
</script>

<style scoped lang="less">
:deep(.ant-spin) {
  max-height: none !important;
}
.vditor-detail-wrapper {
  height: calc(100vh - 124px);
  :deep(.vditor-toolbar) {
    display: none;
  }

  :deep(.vditor-reset) {
    opacity: 1 !important;
    cursor: default !important;
  }
}

:deep(.ant-float-btn) {
  inset-block-end: 90px;
}
</style>
