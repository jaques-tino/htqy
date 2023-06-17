import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from '@/router/routes/base'

import { appRoutes } from './routes'
import createRouteGuard from './guard'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
        title: '登录页'
      }
    },
    {
      path: '/contract/template/new',
      name: 'NewTemplate',
      component: () => import('@/views/contract/template/new.vue'),
      meta: {
        locale: 'menu.contract.template.new',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true
      }
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createRouteGuard(router)

export default router
