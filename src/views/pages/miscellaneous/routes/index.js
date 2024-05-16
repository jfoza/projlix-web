export default [
  {
    path: '/admin/nao-autorizado',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/components/NotAuthorized.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/admin/nao-habilitado',
    name: 'misc-not-enabled',
    component: () => import('@/views/pages/miscellaneous/components/NotEnabled.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/admin/sessao-expirada',
    name: 'disconnected',
    component: () => import('@/views/pages/miscellaneous/components/Disconnected.vue'),
    meta: {
      layout: 'full',
    },
  },

  {
    path: '/admin/pagina-nao-encontrada',
    name: 'error-404',
    component: () => import('@/views/pages/miscellaneous/components/Error404.vue'),
    meta: {
      layout: 'full',
    },
  },
]
