import { subjects, actions } from '@/libs/acl/rules'

export default [
  {
    title: 'Administrativo',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: 'admin-users-insert',
        resource: subjects.ADMIN_USERS,
        action: actions.INSERT,
      },
      {
        title: 'Ver usuários',
        route: 'admin-users',
        resource: subjects.ADMIN_USERS,
        action: actions.VIEW,
      },
    ],
  },
]
