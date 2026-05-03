import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignInView.vue')
  },
  {
    path: '/markers/new',
    name: 'createmarker',
    component: () => import('../views/CreateMarkerView.vue')
  },
  {
    path: '/markers',
    name: 'markermenu',
    component: () => import('../views/MarkerMenuView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
