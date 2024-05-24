import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/views/pages/tags/components/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.TAGS,
      action: actions.VIEW,
    },
  },

  {
    path: '/tags/novo',
    name: 'tags-insert',
    component: () => import('@/views/pages/tags/components/Insert.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.TAGS,
      action: actions.INSERT,
    },
  },

  {
    path: '/tags/editar',
    name: 'tags-update',
    component: () => import('@/views/pages/tags/components/Update.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.TAGS,
      action: actions.UPDATE,
    },
  },
]
