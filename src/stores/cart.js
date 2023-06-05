import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, delCartAPI, getCartListAPI } from '@/apis/cartList.js'
import { mergeCartAPI } from '@/apis/login.js'
import { useUserInfoStore } from '@/stores/userInfo.js'
export const useCartStore = defineStore(
  'useCartStore',
  () => {
    //购物车列表
    const cartList = ref([])
    //商品总数量
    const total = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
    //商品总价格
    const totalPrice = computed(() =>
      cartList.value.reduce((total, item) => total + item.count * item.price, 0)
    )
    //已选件数
    const selectedCount = computed(() => {
      const selectedGoods = cartList.value.filter((item) => item.selected)
      return selectedGoods.reduce((total, item) => total + item.count, 0)
    })
    // 已选商品总价
    const selectedTotalPrice = computed(() => {
      const selectedGoods = cartList.value.filter((item) => item.selected)
      return selectedGoods.reduce((total, item) => total + item.count * item.price, 0)
    })
    // 全选状态
    const isCheckAll = computed({
      get() {
        return cartList.value.every((item) => item.selected === true)
      },
      set(val) {
        cartList.value.forEach((item) => (item.selected = val))
      }
    })
    // 获取购物车列表
    const getCartList = async () => {
      const { data } = await getCartListAPI()
      cartList.value = data.result
    }
    // 添加购物车
    const addCart = async (goods) => {
      //如果用户已登录，则调用接口，否则走本地购物车流程
      const { userInfo } = useUserInfoStore()
      if (userInfo.token) {
        await insertCartAPI({
          skuId: goods.skuId,
          count: goods.count
        })
        // 调用添加接口后，重新获取购物车列表以覆盖本地购物车
        getCartList()
      } else {
        //如果购物车中有该商品，数量加1，否则添加该商品
        const index = cartList.value.findIndex((item) => item.skuId === goods.skuId)
        if (index === -1) {
          cartList.value.push(goods)
        } else {
          cartList.value[index].count++
        }
      }
    }
    //删除购物车的数据
    const removeCart = (goods) => {
      //如果用户已登录，则调用接口，否则走本地购物车流程
      const { userInfo } = useUserInfoStore()
      if (userInfo.token) {
        delCartAPI([goods.skuId])
        // 调用删除接口后，重新获取购物车列表以覆盖本地购物车
        getCartList()
      } else {
        const index = cartList.value.findIndex((item) => item.skuId === goods.skuId)
        cartList.value.splice(index, 1)
      }
    }
    // 合并购物车
    const mergeCart = async () => {
      await mergeCartAPI(cartList.value)
    }
    return {
      cartList,
      total,
      totalPrice,
      addCart,
      removeCart,
      isCheckAll,
      selectedCount,
      selectedTotalPrice,
      getCartList,
      mergeCart
    }
  },
  {
    persist: true
  }
)
