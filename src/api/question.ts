import { get } from '../utils/http' // 导入封装好的 http.js

export function fetchInterviewQuestions() {
  return get('/api/questions') 
}
