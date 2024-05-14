<template>
  <div class="navbar-header">
    <ul class="nav navbar-nav m-img">
      <li class="nav-item">
        <b-link
          class="navbar-brand"
          to="/"
        >
          <span class="brand-logo">
            <b-img
              :src="appLogoImage"
              class="img-fluid"
              alt="logo"
            />
          </span>
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
}
</script>

<style>
@media (max-width: 1200px) {
  .m-img {
    margin-left: 2.2rem !important;
  }
}
</style>
