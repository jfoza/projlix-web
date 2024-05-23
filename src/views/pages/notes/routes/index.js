import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    path: '/notas',
    name: 'notes-list',
    component: () => import('@/views/pages/notes/components/Notes.vue'),
    meta: {
      resource: 'ACL',
      subject: subjects.NOTES,
      action: actions.VIEW,
    },
  },
]
