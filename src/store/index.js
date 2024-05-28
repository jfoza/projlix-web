/* eslint-disable import/no-cycle */
import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'

import sessions from '@/views/pages/authentication/store'
import adminUsers from '@/views/pages/admin-users/store'
import teamUsers from '@/views/pages/team-users/store'
import tags from '@/views/pages/tags/store'
import projects from '@/views/pages/projects/store'
import board from '@/views/pages/board/store'

import defineMenus from './define-menus'
import verticalMenu from './vertical-menu'
import appConfig from './app-config'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sessions,
    app,
    appConfig,
    verticalMenu,
    defineMenus,
    projects,
    adminUsers,
    teamUsers,
    tags,
    board,
  },
  plugins: [
    createPersistedState({
      paths: [
        'sessions',
        'adminUsers',
        'teamUsers',
        'tags',
        'projects',
      ],
    }),
  ],
  strict: process.env.DEV,
})
