import home from '@/navigation/vertical/menus/home'
import projects from '@/navigation/vertical/menus/projects'
import notes from '@/navigation/vertical/menus/notes'
import adminUsers from '@/navigation/vertical/menus/admins'

export default {
  namespaced: true,
  state: {
    menus: [
      ...home,
      ...projects,
      ...notes,
      ...adminUsers,
    ],
  },
  getters: {
    getNavMenuItems: state => state.menus,
  },

  mutations: {

  },
}
