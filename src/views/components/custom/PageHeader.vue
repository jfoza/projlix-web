<template>
  <div class="row content-header">
    <div class="content-header-left mb-2 col-md-9 col-lg-12">
      <div class="row breadcrumbs-top">
        <div class="col-12">
          <h2 class="float-left pr-1 mb-0 text-truncate text-header">
            {{ screenName }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item :to="{ name: 'home' }">
                <feather-icon
                  class="mb-4px text-custom-blue"
                  icon="HomeIcon"
                  size="18"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="(linkItem, key) in linkItems"
                :key="key"
                class="text-truncate"
                style="max-width: 35%"
                :to="{ name: linkItem.routeName }"
                :active="linkItem.active"
              >
                <span class="text-custom-blue">{{ linkItem.name }}</span>
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue'

export default {

  components: { BBreadcrumb, BBreadcrumbItem },
  props: {
    screenName: {
      required: true,
      type: String,
    },

    linkItems: {
      required: true,
      type: Array,
    },
  },
}
</script>

<style>
.text-header {
  max-width: 35%;
}

@media screen and (max-width: 650px) {
  .text-header {
    max-width: 100% !important
  }
}
</style>
