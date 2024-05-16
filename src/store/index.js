/* eslint-disable import/no-cycle */
import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'
import sessions from '@/views/pages/authentication/store'
import adminUsers from '@/views/pages/admin-users/store'
import projects from '@/views/pages/projects/store'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import defineMenus from './define-menus'

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
  },
  plugins: [
    createPersistedState({
      paths: [
        'sessions',
        'adminUsers',
      ],
    }),
  ],
  strict: process.env.DEV,
})
