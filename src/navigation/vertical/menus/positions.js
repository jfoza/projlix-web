export default [
  {
    title: 'Cargos',
    icon: 'PocketIcon',
    children: [
      {
        title: 'Cadastrar novo',
        route: 'new-position-form',
        resource: 'ROOT',
        action: 'VIEW',
      },
      {
        title: 'Ver cargos',
        route: 'positions-list',
        resource: 'ROOT',
        action: 'VIEW',
      },
    ],
  },
]
