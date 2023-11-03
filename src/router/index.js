import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:channelId?',
      name: 'Guide',
      component: () => import('../views/Guide.vue')
    },
    // {
    //   path: '/:channelId',
    //   name: 'Channel',
    //   component: () => import('../views/Channel.vue')
    // }
  ]
})

export default router
