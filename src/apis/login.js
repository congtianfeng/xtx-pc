import request from '@/utils/request'

// 登录接口

export const loginAPI = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
// 登录时合并本地购物车到接口购物车
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'post',
    data
  })
}
