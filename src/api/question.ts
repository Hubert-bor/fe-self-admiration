import { get, post, put } from '../utils/http' // 导入封装好的 http.js

/**
 * @description: 获取面试题列表
 */
export function fetchInterviewQuestions() {
  return get('/api/questions')
}

/**
 * @description: 获取面试题类型
 */
export function fetchInterviewTypes() {
  return get('/api/getQuestionEnum')
}

interface Question {
  id?: number
  title: string
  type?: string
  answer: string
  createdAt?: string
  updatedAt: string
}

/**
 * @description: 添加面试题
 */
export function addInterviewQuestion(data: Question) {
  return post('/api/addQuestion', data)
}

/**
 * @description: 根据 id 查询面试题
 */
export function fetchInterviewQuestionById(id: string) {
  return get(`/api/findQuestionById/${id}`)
}

/**
 * @description: 更新面试题
 */
export function updateInterviewQuestion(data: Question) {
  return put('/api/updateQuestion', data)
}
