import { get } from '../utils/http' // 导入封装好的 http.js

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
