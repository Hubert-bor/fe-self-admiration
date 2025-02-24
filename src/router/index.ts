import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/wordCloud'
      // component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/wordCloud',
      name: 'wordCloud',
      component: () => import('@/views/ThreeDWordCloud.vue')
    },
    {
      path: '/hoist',
      name: 'hoist',
      component: () => import('@/views/hoist/index.vue')
    },
    {
      path: '/foo',
      name: 'foo',
      component: () => import('@/views/hoist/FooCmp.vue')
    }
  ]
})

export default router
