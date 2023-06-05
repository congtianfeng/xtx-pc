import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/login'
import router from '@/router/index.js'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cart'
const { mergeCart } = useCartStore()
export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    //用户数据
    const userInfo = ref({})
    // 获取用户数据
    async function getUserInfo(Data) {
      try {
        const { data } = await loginAPI(Data)
        userInfo.value = data.result
        mergeCart()
        ElMessage.success('登录成功')
        router.replace('/')
      } catch {
        ElMessage.error('登录失败')
      }
    }
    // 清除用户数据
    function clearUserInfo() {
      userInfo.value = {}
    }
    return { userInfo, getUserInfo, clearUserInfo }
  },
  {
    persist: true
  }
)
