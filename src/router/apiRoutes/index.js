export default {
  login: '/auth/login',
  googleLogin: '/auth/login/google',
  logout: '/auth/logout',

  profiles: '/profiles',

  notes: '/notes',
  noteId: id => `/notes/${id}`,

  projects: '/projects',
  projectId: id => `/projects/${id}`,

  addProjectTag: '/projects/tags',
  addProjectTeamUser: '/projects/team-users',

  projectUniqueName: uniqueName => `/projects/unique-name/${uniqueName}`,
  projectInfo: id => `/projects/${id}/info`,
  projectTag: id => `/projects/${id}/tags`,
  projectTeamUser: id => `/projects/${id}/team-users`,
  projectIcon: id => `/projects/${id}/icons`,

  adminUsers: '/admin-users',
  adminUserId: id => `/admin-users/${id}`,

  teamUsers: '/team-users',
  teamUserId: id => `/team-users/${id}`,
  teamUserStatus: id => `/team-users/status/${id}`,

  tags: '/tags',
  tagId: id => `/tags/${id}`,
  tagStatus: id => `/tags/status/${id}`,

  sections: '/sections',
  sectionId: id => `/sections/${id}`,
  reorderSection: id => `/sections/${id}/reorder`,

  icons: '/icons',
  colors: '/colors',
}
