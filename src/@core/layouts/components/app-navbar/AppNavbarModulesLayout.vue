<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <notification-dropdown />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BNavbarNav,
} from 'bootstrap-vue'

import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {

    // Navbar Components
    BNavbarNav,
    NotificationDropdown,
    UserDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

}
</script>
