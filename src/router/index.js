import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/#'),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/layout/components/home/index.vue')
        },
        {
          path: 'category/sub/:id',
          name: 'sub-category',
          component: () => import('@/views/layout/components/sub-category/index.vue')
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('@/views/layout/components/category/index.vue')
        },
        {
          path: 'goodsInfo/:id',
          name: 'goodsInfo',
          component: () => import('@/views/layout/components/goodsInfo/index.vue')
        },
        {
          path: 'cartList',
          name: 'cartList',
          component: () => import('@/views/layout/components/cartList.vue')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/layout/components/orders/index.vue')
        },
        {
          path: 'payPage/:id',
          name: 'payPage',
          component: () => import('@/views/layout/components/payPage/index.vue')
        },
        {
          path: 'paycallback',
          name: 'paycallback',
          component: () => import('@/views/layout/components/payPage/paycallback.vue')
        },
        {
          path: 'VIP',
          name: 'VIP',
          component: () => import('@/views/layout/components/VIP/index.vue'),
          children: [
            {
              path: '',
              name: 'userInfo',
              component: () => import('@/views/layout/components/VIP/userInfo.vue')
            },
            {
              path: 'myOrders',
              name: 'myOrders',
              component: () => import('@/views/layout/components/VIP/myOrders.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
