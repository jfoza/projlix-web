export default [
  {
    path: '/projetos',
    name: 'projects-list',
    component: () => import('@/views/pages/projects/components/List.vue'),
    meta: {
      resource: 'ACL',
      subject: 'ROOT',
      action: 'VIEW',
    },
  },
]
