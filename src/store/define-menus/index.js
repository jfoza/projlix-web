import home from '@/navigation/vertical/menus/home'
import projects from '@/navigation/vertical/menus/projects'
import notes from '@/navigation/vertical/menus/notes'

export default {
  namespaced: true,
  state: {
    menus: [
      ...home,
      ...projects,
      ...notes,
    ],
  },
  getters: {
    getNavMenuItems: state => state.menus,
  },

  mutations: {

  },
}
