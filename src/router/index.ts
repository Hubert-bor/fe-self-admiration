import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '@/views/HomePage.vue'
import ThreeDWordCloud from '@/views/ThreeDWordCloud.vue'
console.log('import.meta', import.meta)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/wordCloud'
      // component: HomePage
    },
    {
      path: '/wordCloud',
      name: 'wordCloud',
      component: ThreeDWordCloud
    }
  ]
})

export default router
