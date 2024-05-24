export default {
  login: '/auth/login',
  googleLogin: '/auth/login/google',
  logout: '/auth/logout',

  profiles: '/profiles',

  notes: '/notes',
  noteId: id => `/notes/${id}`,

  projects: '/projects',
  projectId: id => `/projects/${id}`,

  adminUsers: '/admin-users',
  adminUserId: id => `/admin-users/id/${id}`,

  teamUsers: '/team-users',
  teamUserId: id => `/team-users/id/${id}`,
  teamUserStatus: id => `/team-users/status/${id}`,

  tags: '/tags',
  tagId: id => `/tags/id/${id}`,
  tagStatus: id => `/tags/status/${id}`,
}
