import request from '@/utils/request'
// 获取轮播图数据
export const getBannerAPI = (distributionSite = 1) => {
  return request({
    url: '/home/banner',
    params: { distributionSite }
  })
}
// 获取新鲜好物数据
export const getNewList = () => {
  return request({
    url: '/home/new'
  })
}
// 获取人气推荐数据
export const getHotList = () => {
  return request({
    url: '/home/hot'
  })
}
// 获取所有商品模块
export const getGoods = () => {
  return request({
    url: '/home/goods'
  })
}
