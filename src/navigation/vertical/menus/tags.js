import { subjects, actions } from '@/libs/acl/rules'

export default [
  {
    title: 'Tags',
    icon: 'TagIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: 'tags-insert',
        resource: subjects.TAGS,
        action: actions.INSERT,
      },
      {
        title: 'Ver tags',
        route: 'tags',
        resource: subjects.TAGS,
        action: actions.VIEW,
      },
    ],
  },
]
