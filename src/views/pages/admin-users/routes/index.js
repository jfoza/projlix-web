import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    path: '/usuarios/administrativo',
    name: 'admin-users',
    component: () => import('@/views/pages/admin-users/components/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ADMIN_USERS,
      action: actions.VIEW,
    },
  },

  {
    path: '/usuarios/administrativo/novo',
    name: 'admin-users-insert',
    component: () => import('@/views/pages/admin-users/components/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ADMIN_USERS,
      action: actions.INSERT,
    },
  },

  {
    path: '/usuarios/administrativo/editar',
    name: 'admin-users-update',
    component: () => import('@/views/pages/admin-users/components/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.ADMIN_USERS,
      action: actions.UPDATE,
    },
  },
]
