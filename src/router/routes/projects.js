export default [
  {
    path: '/projetos',
    name: 'projects-list',
    component: () => import('@/views/pages/projects/List.vue'),
    meta: {
      resource: 'ACL',
      subject: 'ROOT',
      action: 'VIEW',
    },
  },
]
