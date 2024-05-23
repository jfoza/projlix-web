import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    path: '/usuarios/time',
    name: 'team-users',
    component: () => import('@/views/pages/team-users/components/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.TEAM_USERS,
      action: actions.VIEW,
    },
  },

  {
    path: '/usuarios/time/novo',
    name: 'team-users-insert',
    component: () => import('@/views/pages/team-users/components/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.TEAM_USERS,
      action: actions.INSERT,
    },
  },

  {
    path: '/usuarios/time/editar',
    name: 'team-users-update',
    component: () => import('@/views/pages/team-users/components/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.TEAM_USERS,
      action: actions.UPDATE,
    },
  },
]
