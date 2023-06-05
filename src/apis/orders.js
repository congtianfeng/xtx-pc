import request from '@/utils/request'
/**
 * 获取结算信息(生成-订单(结算页))
 */
export const getCheckoutInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}
// 获取地址
export const getAddressAPI = () => {
  return request({
    url: '/member/address'
  })
}
// 添加地址接口
export const addAddressAPI = (data) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data
  })
}
// 删除地址接口
export const deleteAddressAPI = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'DELETE'
  })
}
// 提交订单接口
export const submitOrderAPI = (data) => {
  return request({
    url: `/member/order`,
    method: 'POST',
    data
  })
}
