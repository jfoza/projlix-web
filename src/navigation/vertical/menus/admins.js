import { subjects, actions } from '@/libs/acl/rules'
import usersModuleRouter from '@/views/modules/users/routes'

export default [
  {
    title: 'Início',
    icon: 'HomeIcon',
    route: usersModuleRouter.home.name,
    resource: subjects.USERS_MODULE,
    action: actions.VIEW,
  },

  {
    title: 'Gerenciar usuários',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: usersModuleRouter.usersInsert.name,
        resource: subjects.ADMIN_USERS,
        action: actions.INSERT,
      },
      {
        title: 'Ver usuários',
        route: usersModuleRouter.usersList.name,
        resource: subjects.ADMIN_USERS,
        action: actions.VIEW,
      },
    ],
  },
]
