import axios from 'axios'

// 创建一个 Axios 实例
const fetch = axios.create({
  baseURL: import.meta.env.DEV_API_URL, // 根据实际情况设置基本 URL
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
fetch.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里加入 token 或其他公共请求头
    const token = localStorage.getItem('token') // 假设 token 存在 localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // 设置 Authorization header
    }
    return config
  },
  (error) => {
    // 请求错误时做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
fetch.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    // 比如根据状态码统一处理
    if (response.status === 200) {
      return response.data // 返回响应的实际数据部分
    }
    return Promise.reject(new Error('响应异常'))
  },
  (error) => {
    // 对响应错误做些什么
    let message = '网络错误'
    if (error.response) {
      // 根据响应状态码做不同的处理
      switch (error.response.status) {
        case 401:
          message = '未授权，请登录'
          break
        case 404:
          message = '请求地址未找到'
          break
        case 500:
          message = '服务器错误'
          break
        default:
          message = error.response.data.message || message
          break
      }
    }
    // 可以使用弹窗或者其他方式给用户展示错误信息
    console.error(message)
    return Promise.reject(error)
  }
)

// 封装常用的请求方法（GET, POST）
export const get = (url: string, params = {}) => {
  return fetch.get(url, { params })
}

export const post = (url: string, data = {}) => {
  return fetch.post(url, data)
}

export const put = (url: string, data = {}) => {
  return fetch.put(url, data)
}

export const del = (url: string, params = {}) => {
  return fetch.delete(url, { params })
}

export default fetch
