import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/signin',
    name: 'signIn',
    component: () => import('../views/SignInView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
