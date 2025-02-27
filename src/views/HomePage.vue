<template>
  <div class="page-container p-6">
    <!-- <ChatAI /> -->
    <!-- <div class="wrapper">
      <div class="link">
        <a href="https://heydesign.systems/" target="_blank">新手设计系统资料库</a>
      </div>

      <div class="link">
        <a href="https://andreasbm.github.io/web-skills/" target="_blank">互联网技能树</a>
      </div>
    </div> -->

    <List size="small" :loading="listLoading" :data-source="questionList" bordered>
      <template #renderItem="{ item }">
        <ListItem :key="`a-${item.id}`">
          <!-- <template #actions><a>View Profile</a></template> -->
          <ListItemMeta>
            <template #description>
              <div v-for="(q, idx) in item.children" :key="q.id">
                <span class="title-linear-gradient">
                  {{ `${idx + 1}、${q.title}` }}
                </span>
              </div>
            </template>
            <template #title>
              <a>{{ item.name }}</a>
            </template>
            <template #avatar>
              <div :class="[`${iconMap[item.name]}`, 'text-2xl']" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
// import ChatAI from './ChatAI.vue'
import { fetchInterviewQuestions } from '@/api'
import { List, ListItemMeta, ListItem } from 'ant-design-vue'

import { ref, onMounted } from 'vue'

interface Question {
  id: number
  title: string
  type: string
  answer: string
  createdAt: string
  updatedAt: string
}

const iconMap: any = {
  Vite: 'icon-[devicon--vitejs]',
  TS: 'icon-[vscode-icons--file-type-typescriptdef]',
  Other: 'icon-[basil--other-1-outline]',
  HTML: 'icon-[devicon--html5]',
  Vue: 'icon-[logos--vue]',
  Engineering: 'icon-[flat-color-icons--engineering]',
  JS: 'icon-[vscode-icons--file-type-js]',
  HandWriting: 'icon-[emojione--pencil]',
  CSS: 'icon-[devicon--css3-plain]',
  React: 'icon-[devicon--react]'
}

const questionList = ref<any[]>([])
const listLoading = ref(false)

/**
 * @description: 根据类型分组问题列表
 */

const groupByType = (list: Question[]) => {
  const result: Record<string, Question[]> = {}

  list.forEach((item) => {
    if (!result[item.type]) {
      result[item.type] = []
    }
    result[item.type].push(item)
  })

  return result
}

/**
 * @description: 将分类数据处理为list组件所需要的数据格式
 */
const formatData = (data: Record<string, Question[]>): any[] => {
  return Object.entries(data).map(([type, questions]) => ({
    name: type,
    children: questions
  }))
}

onMounted(async () => {
  listLoading.value = true
  try {
    const res = await fetchInterviewQuestions()
    questionList.value = formatData(groupByType(res.data))
  } finally {
    listLoading.value = false
  }
})
</script>

<style lang="less" scoped>
.page-container {
  .title-linear-gradient {
    width: fit-content;
    background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%) no-repeat right bottom;
    background-size: 0 2px;
    transition: background-size 800ms;
    cursor: pointer;
    padding-bottom: 2px;

    &:hover {
      background-position-x: left;
      background-size: 100% 2px;
      color: #111827;
    }
  }

  .avatar {
    font-size: 2em;
  }
  // .wrapper {
  //   display: grid;
  //   height: 100%;
  //   justify-content: center;
  //   gap: 10px;
  //   align-content: center;

  //   .link {
  //     border: 1px solid #ccc;
  //     padding: 10px;
  //     border-radius: 10px;

  //     &:hover {
  //       background: #ccc;
  //     }
  //   }
  // }
}
</style>
