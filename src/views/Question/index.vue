<template>
  <div class="page-container p-6">
    <!-- 图标 -->
    <AvatarScale />
    <!-- 列表 -->
    <List
      size="small"
      :loading="listLoading"
      :data-source="questionList"
      :locale="{ emptyText: '暂无数据' }"
    >
      <template #renderItem="{ item }">
        <ListItem :key="`a-${item.id}`">
          <ListItemMeta>
            <template #description>
              <div v-for="(q, idx) in item.children" :key="q.id">
                <span
                  class="title-linear-gradient"
                  @click="router.push({ path: '/questionDetail', query: { qId: q.id } })"
                >
                  {{ `${idx + 1}、${q.title}` }}
                </span>
              </div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>

    <!-- 添加 -->
    <FloatButton tooltip="添加" @click="goAddPage">
      <template #icon>
        <Icon icon="mage:edit" />
      </template>
    </FloatButton>
  </div>
</template>

<script setup lang="ts">
import { fetchInterviewQuestions } from '@/api'
import { List, ListItemMeta, ListItem, FloatButton } from 'ant-design-vue'
import { Icon } from '@iconify/vue'
import AvatarScale from '@/components/AvatarScale.vue'

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Question {
  id: number
  title: string
  type: string
  answer: string
  createdAt: string
  updatedAt: string
}

const router = useRouter()
const route = useRoute()

// const iconMap: any = {
//   Vue: 'logos:vue',
//   JS: 'vscode-icons:file-type-js',
//   TS: 'skill-icons:typescript',
//   HTML: 'devicon:html5',
//   CSS: 'devicon:css3',
//   Vite: 'vscode-icons:file-type-vite',
//   Other: 'material-symbols-light:other-admission-rounded',
//   Engineering: 'flat-color-icons:engineering',
//   HandWriting: 'solar:pen-linear',
//   Network: 'emojione-v1:three-networked-computers',
//   Project: 'ix:project-new',
//   Optimization: 'emojione-v1:lightning-mood',
//   Visualization: 'flat-color-icons:combo-chart',
//   React: 'devicon:react'
// }

const questionList = ref<any[]>([])
const listLoading = ref(false)

/**
 * @description: 跳转到添加页面
 */
const goAddPage = () => {
  router.push({ path: '/add', query: { type: route.query.framework } })
}

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
  return Object.entries(data)
    .map(([type, questions]) => ({
      name: type,
      children: questions
    }))
    .filter((item) => {
      return item.name === route.query.framework
    })
}

/**
* @description: 将面试题类型数据转为图标映射表

*/
// const formatIconMap = (data: QuestionType[]) => {
//   const map: Record<string, string> = {}
//   data.forEach((item) => {
//     map[item.type] = item.iconType
//   })

//   return map
// }

/**
 * @description: 获取面试题数据
 */
const fetchData = async () => {
  listLoading.value = true
  try {
    const res = await fetchInterviewQuestions()
    questionList.value = formatData(groupByType(res.data))
  } finally {
    listLoading.value = false
  }
}

/**
 * @description: 获取面试题类型数据
 */
// const getTypeList = async () => {
//   const res = await fetchInterviewTypes()
//   iconMap.value = formatIconMap(res.data)
// }

onMounted(fetchData)
</script>

<style lang="less" scoped>
.page-container {
  @media (max-width: 768px) {
    .title-linear-gradient {
      color: #000;
    }
  }

  @media (min-width: 768px) {
    .title-linear-gradient:hover {
      background-position-x: left;
      background-size: 100% 2px;
      color: #111827;
    }
  }

  .title-linear-gradient {
    width: fit-content;
    background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%) no-repeat right bottom;
    background-size: 0 2px;
    transition: background-size 800ms;
    cursor: pointer;
    padding-bottom: 2px;
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
