import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  //分类列表数据
  const isLoading = ref(true)
  const categoryList = ref([])
  function getCategory() {
    getCategoryAPI().then((res) => {
      categoryList.value = res.data.result
      isLoading.value = false
    })
  }
  return { categoryList, getCategory, isLoading }
})
