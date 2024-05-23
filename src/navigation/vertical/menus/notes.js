import { actions, subjects } from '@/libs/acl/rules'

export default [
  {
    title: 'Notas',
    icon: 'FileIcon',
    route: 'notes-list',
    resource: subjects.NOTES,
    action: actions.VIEW,
  },
]
