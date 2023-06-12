import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/contract',
  name: 'Contract',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.contract',
    requiresAuth: true,
    icon: 'icon-layers',
    order: 0,
  },
  redirect: '/contract/template',
  children: [
    {
      path: 'template',
      name: 'Template',
      component: () => import('@/views/contract/template/index.vue'),
      meta: {
        locale: 'menu.contract.template',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
