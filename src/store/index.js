/* eslint-disable import/no-cycle */
import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'
import sessions from '@/store/sessions'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import defineMenus from './define-menus'
import projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sessions,
    app,
    appConfig,
    verticalMenu,
    defineMenus,
    projects,
  },
  plugins: [
    createPersistedState({
      paths: [
        'sessions',
      ],
    }),
  ],
  strict: process.env.DEV,
})
