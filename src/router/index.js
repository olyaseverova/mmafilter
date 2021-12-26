import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/autorisation',
    name: 'Autorisation',
    component: () => import('../views/Autorisation.vue')
  },
  {
    path: '/ways',
    name: 'Ways',
    component: () => import('../views/Ways.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
