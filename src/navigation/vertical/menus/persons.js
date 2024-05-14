export default [
  {
    title: 'Pessoas',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: 'new-person-form',
        resource: 'ROOT',
        action: 'VIEW',
      },
      {
        title: 'Ver pessoas',
        route: 'persons-list',
        resource: 'ROOT',
        action: 'VIEW',
      },
    ],
  },
]
