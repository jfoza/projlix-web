import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    path: '/projetos',
    name: 'projects-list',
    component: () => import('@/views/pages/projects/components/List.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.PROJECTS,
      action: actions.VIEW,
    },
  },
]
