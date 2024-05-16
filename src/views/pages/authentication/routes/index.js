export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/components/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'AUTH',
      redirectIfLoggedIn: true,
    },
  },
]
