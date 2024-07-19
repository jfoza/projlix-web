/* eslint-disable import/no-cycle */
import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'

import navbar from '@/views/pages/navbar/store'
import sessions from '@/views/pages/authentication/store'
import adminUsers from '@/views/pages/admin-users/store'
import teamUsers from '@/views/pages/team-users/store'
import tags from '@/views/pages/tags/store'
import projects from '@/views/pages/projects/store'
import board from '@/views/pages/board/store'
import icons from '@/views/pages/icons/store'
import colors from '@/views/pages/colors/store'

import defineMenus from './define-menus'
import verticalMenu from './vertical-menu'
import appConfig from './app-config'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navbar,
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
    icons,
    colors,
  },
  plugins: [
    createPersistedState({
      paths: [
        'navbar',
        'sessions',
        'adminUsers',
        'teamUsers',
        'tags',
      ],
    }),
  ],
  strict: process.env.DEV,
})
