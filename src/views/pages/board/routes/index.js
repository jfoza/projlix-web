import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    path: '/projetos/:projectUniqueName/tarefas',
    name: 'project-tasks',
    component: () => import('@/views/pages/board/components/Board.vue'),
    props: true,
    meta: {
      resource: 'ACL',
      subject: subjects.TAGS,
      action: actions.VIEW,
    },
  },
]
