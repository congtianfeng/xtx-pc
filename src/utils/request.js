import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 5000 // 单位是毫秒
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const { userInfo } = useUserInfoStore()
  if (userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      ElMessage.error('请先登录')
    }
    return Promise.reject(error)
  }
)
export default request
