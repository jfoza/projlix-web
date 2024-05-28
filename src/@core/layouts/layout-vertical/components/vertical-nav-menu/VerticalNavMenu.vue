<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="!getIsVerticalMenuCollapsed || (getIsVerticalMenuCollapsed && isMouseHovered) ? 'expanded menu-light' : 'menu-light'"
  >
    <!-- main menu header-->
    <div
      :class="!getIsVerticalMenuCollapsed ? 'navbar-header expanded custom-header' : 'custom-header'"
    >
      <span
        class="system-logo mr-1"
      >
        <b-link
          :to="{ name: 'home' }"
        >
          <b-img
            v-if="!getIsVerticalMenuCollapsed"
            :src="appLogoImage"
            alt="logo"
          />
        </b-link>

        <b-link
          :to="{ name: 'home' }"
        >
          <b-img
            v-if="getIsVerticalMenuCollapsed"
            :src="firstLetterImg"
            alt="logo"
          />
        </b-link>
      </span>

      <span class="system-button">
        <button
          type="button"
          class="btn btn-menu-collapsed"
          @click="setMenuCollapse"
        >
          <font-awesome-icon
            icon="fa-solid fa-chevron-left"
            :style="getStylesIconLeft"
          />
          <font-awesome-icon
            icon="fa-solid fa-chevron-left"
            :style="getStylesIconLeft"
          />
        </button>
      </span>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div
      :class="{'d-block': shallShadowBottom}"
      class="shadow-bottom"
    />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }"
    >
      <vertical-nav-menu-items
        :items="navMenuItems"
        class="navigation navigation-main"
      />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import Vue from 'vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BLink, BImg } from 'bootstrap-vue'
import { provide, computed, ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import { $themeConfig } from '@themeConfig'
import provider from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import firstLetterImg from '@/assets/images/custom/light-green.png'
import useVerticalNavMenu from './useVerticalNavMenu'
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'

library.add(
  faChevronLeft,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props)

    const { skin } = useAppConfig()

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    const collapseTogglerIconFeather = computed(() => (collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon'))

    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    return {
      navMenuItems: computed(() => provider.getters['defineMenus/getNavMenuItems']),

      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage,
    }
  },

  data() {
    return {
      firstLetterImg,
    }
  },

  computed: {
    getStylesIconLeft() {
      return this.$store.getters['verticalMenu/getStylesIconLeft']
    },

    getIsVerticalMenuCollapsed() {
      return this.$store.getters['verticalMenu/getIsVerticalMenuCollapsed']
    },
  },

  methods: {
    setMenuCollapse() {
      this.$store.commit(
        'verticalMenu/updateVerticalMenuCollapsed',
        !this.getIsVerticalMenuCollapsed,
      )
    },
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";

.custom-header {
  height: 65px !important;
  padding: 0 0.6rem 0 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.system-logo {
  height: max-content;
}

.system-logo img {
  max-width: 190px;
  max-height: 30px;
}

.btn-menu-collapsed {
  padding: 0;
  background-color: transparent;
  border: none;
  display: block;
}

@media (width < 1200px) {
  .btn-menu-collapsed {
    display: none;
  }
}
</style>
