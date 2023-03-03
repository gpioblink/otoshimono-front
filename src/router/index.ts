// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/MainOnly.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Add.vue'),
      },
      {
        path: '/find',
        name: 'Find',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Find.vue'),
      },
    ],
  },
  {
    path: '/done',
    component: () => import('@/layouts/default/MainOnly.vue'),
    children: [
      {
        path: 'pickup',
        name: 'Pickup',
        component: () => import(/* webpackChunkName: "home" */ '@/views/done/Pickup.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
