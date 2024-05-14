import { $themeConfig } from '@themeConfig'

export default {
  namespaced: true,

  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,

    isRotated: false,
  },

  getters: {
    getIsVerticalMenuCollapsed: state => state.isVerticalMenuCollapsed,

    getStylesIconLeft: state => ({
      transform: state.isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
    }),
  },

  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val

      state.isRotated = !state.isRotated
    },
  },
  actions: {},
}
