export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      resource: 'ACL',
      subject: 'ROOT',
      action: 'VIEW',
    },
  },
]
