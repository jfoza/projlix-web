export default [
  {
    title: 'Reuniões',
    icon: 'VideoIcon',
    children: [
      {
        title: 'Cadastrar nova',
        route: 'new-meet-form',
        resource: 'ROOT',
        action: 'VIEW',
      },
      {
        title: 'Ver reuniões',
        route: 'meetings-list',
        resource: 'ROOT',
        action: 'VIEW',
      },
    ],
  },
]
