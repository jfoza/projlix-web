import { subjects, actions } from '@/libs/acl/rules'

export default [
  {
    title: 'Time',
    icon: 'HexagonIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: 'team-users-insert',
        resource: subjects.TEAM_USERS,
        action: actions.INSERT,
      },
      {
        title: 'Ver usuários',
        route: 'team-users',
        resource: subjects.TEAM_USERS,
        action: actions.VIEW,
      },
    ],
  },
]
