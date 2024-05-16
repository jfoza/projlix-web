export default [
  {
    path: '/notas',
    name: 'notes-list',
    component: () => import('@/views/pages/notes/components/Notes.vue'),
    meta: {
      resource: 'ACL',
      subject: 'NOTES',
      action: 'VIEW',
    },
  },
]
