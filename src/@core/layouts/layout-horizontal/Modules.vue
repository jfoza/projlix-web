<template>
  <div
    class="horizontal-layout"
    :class="[layoutClasses]"
    :data-col="isNavMenuHidden ? '1-column' : null"
    style="height:inherit"
  >

    <!-- NAVBAR -->
    <b-navbar
      :style="{
        backgroundColor: navbarType === 'static' && scrolledTo && skin === 'light' ? 'white' : null,
        boxShadow: navbarType === 'static' && scrolledTo ? 'rgba(0, 0, 0, 0.05) 0px 4px 20px 0px' : null,
      }"
      :toggleable="false"
      class="header-navbar navbar-shadow align-items-center navbar-brand-center navbar-fixed"
      :class="{'fixed-top': $store.getters['app/currentBreakPoint'] !== 'xl'}"
    >
      <slot
        name="navbar"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
      >
        <app-navbar-modules-layout-brand />
        <app-navbar-modules-layout :toggle-vertical-menu-active="toggleVerticalMenuActive" />
      </slot>
    </b-navbar>
    <!--/ NAVBAR -->

    <slot />
  </div>
</template>

<script>
import AppNavbarModulesLayout from '@core/layouts/components/app-navbar/AppNavbarModulesLayout.vue'
import AppNavbarModulesLayoutBrand from '@core/layouts/components/app-navbar/AppNavbarModulesLayoutBrand.vue'
import useAppConfig from '@core/app-config/useAppConfig'
import { BNavbar } from 'bootstrap-vue'
import { useScrollListener } from '@core/comp-functions/misc/event-listeners'

import { onUnmounted } from '@vue/composition-api'
import useLayoutHorizontal from './useLayoutHorizontal'

// Vertical Menu
/* eslint-disable import/order */
import useVerticalLayout from '@core/layouts/layout-vertical/useVerticalLayout'
import mixinLayoutHorizontal from './mixinLayoutHorizontal'
/* eslint-enable import/order */

export default {
  components: {
    AppNavbarModulesLayout,
    AppNavbarModulesLayoutBrand,
    BNavbar,
  },
  mixins: [mixinLayoutHorizontal],
  computed: {
    layoutContentRenderer() {
      const rendererType = this.$route.meta.contentRenderer
      if (rendererType === 'sidebar-left') return 'layout-content-renderer-left'
      if (rendererType === 'sidebar-left-detached') return 'layout-content-renderer-left-detached'
      return 'layout-content-renderer-default'
    },
  },
  setup() {
    const {
      skin,
      navbarType,
      footerType,
      routerTransition,
      isNavMenuHidden,
    } = useAppConfig()

    // Vertical Menu
    const {
      isVerticalMenuActive, toggleVerticalMenuActive, overlayClasses, resizeHandler,
    } = useVerticalLayout(navbarType, footerType)

    // Resize handler
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    const {
      navbarMenuTypeClass,
      layoutClasses,
      footerTypeClass,
    } = useLayoutHorizontal(navbarType, footerType, isVerticalMenuActive)

    // Scroll Listener
    const { scrolledTo } = useScrollListener()

    return {
      // skin
      skin,

      // Layout
      layoutClasses,

      // Navbar
      navbarType,
      navbarMenuTypeClass,

      // Menu Hidden
      isNavMenuHidden,

      // Router Transition
      routerTransition,

      // Footer
      footerTypeClass,

      // Scroll Listeners
      scrolledTo,

      // Vertical Menu
      isVerticalMenuActive,
      toggleVerticalMenuActive,
      overlayClasses,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/themes/bordered-layout.scss";

.horizontal-menu .header-navbar {
  background: #f8f8f8;
}

.header-navbar.navbar-shadow {
  box-shadow: none;
}
</style>
