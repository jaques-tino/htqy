import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const DEVELOPER: AppRouteRecordRaw = {
  path: '/developer',
  name: 'Developer',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.developer',
    requiresAuth: true,
    icon: 'icon-layers',
    order: 0
  },
  redirect: '/developer/error',
  children: [
    {
      path: 'error',
      name: 'DevError',
      component: () => import('@/views/developer/error/index.vue'),
      meta: {
        locale: 'menu.developer.error',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default DEVELOPER
