export default [
  {
    path: '/notas',
    name: 'notes-list',
    component: () => import('@/views/pages/notes/Notes.vue'),
    meta: {
      resource: 'ACL',
      subject: 'NOTES',
      action: 'VIEW',
    },
  },
]
