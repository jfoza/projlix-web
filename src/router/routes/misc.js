export default [
  {
    path: '/admin/nao-autorizado',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/admin/nao-habilitado',
    name: 'misc-not-enabled',
    component: () => import('@/views/pages/miscellaneous/NotEnabled'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/admin/sessao-expirada',
    name: 'disconnected',
    component: () =>
        import ('@/views/pages/miscellaneous/Disconnected.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/admin/pagina-nao-encontrada',
    name: 'error-404',
    component: () =>
        import ('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
]
