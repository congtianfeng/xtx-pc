// 利用vueuse的useIntersectionObserver封装一个请求懒加载的方法
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export function useRequestLazy(apiFn) {
  // 定义一个判断数据是否在加载的变量
  const isLoading = ref(true)
  // 监视的目标ref对象容器，最后返回出去
  const target = ref(null)
  // 发送请求得到的数据
  const list = ref([])
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 进入可视区域的逻辑
    if (isIntersecting) {
      stop()
      apiFn().then((res) => {
        list.value = res.data.result
        isLoading.value = false
      })
    }
  })

  return {
    target,
    list,
    isLoading
  }
}
