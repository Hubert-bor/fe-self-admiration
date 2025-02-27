import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/hoist'
      component: () => import('@/views/HomePage.vue')
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
    },
    {
      path: '/bar',
      name: 'bar',
      component: () => import('@/views/hoist/BarCmp.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/Question/AddQuestion/index.vue')
    },
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component: () => import('@/views/Question/QuestionDetail/index.vue')
    }
  ]
})

export default router
