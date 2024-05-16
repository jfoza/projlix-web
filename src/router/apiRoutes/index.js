export default {
  login: '/auth/login',
  googleLogin: '/auth/login/google',
  logout: '/auth/logout',

  notes: '/notes',
  noteId: id => `/notes/${id}`,

  projects: '/projects',
  projectId: id => `/projects/${id}`,

  adminUsers: '/admin-users',
  adminUserId: id => `/admin-users/id/${id}`,
}
