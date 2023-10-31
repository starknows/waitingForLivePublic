import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/waitingForLivePublic/'),
  routes: [
    {
      path: '/',
      name: 'Guide',
      component: () => import('../views/Guide.vue')
    },
    {
      path: '/:channelId',
      name: 'Channel',
      component: () => import('../views/Channel.vue')
    }
  ]
})

export default router