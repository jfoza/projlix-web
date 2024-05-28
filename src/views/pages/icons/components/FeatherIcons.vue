<template>
  <div>
    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner />
    </div>

    <section
      v-if="!loading"
      id="feather-icons"
      :style="getStyles"
      class="feather-icons"
    >
      <div
        id="icons-container"
        class="feather-icons-container"
      >
        <b-card
          v-for="icon in icons"
          :key="icon.id"
          v-b-tooltip.hover.top="icon.name"
          :class="{ 'selected-card': selectedIcon.id === icon.id }"
          @click="handleSelectSectionIcon(icon)"
        >
          <div class="icon-wrapper">
            <feather-icon
              :icon="icon.name"
              size="24"
            />
          </div>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
import {
  BCard,
  BSpinner,
  VBTooltip,
} from 'bootstrap-vue'
import { getAllIcons } from '@/views/pages/icons/api'

export default {

  components: {
    BCard,
    BSpinner,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  props: {
    height: {
      type: String,
      default: '100%',
    },
  },

  data() {
    return {
      icons: [],

      selectedIcon: { id: '' },

      loading: true,
    }
  },

  computed: {
    getStyles() {
      return {
        height: this.height,
      }
    },
  },

  mounted() {
    this.handleFindAllIcons()
  },

  methods: {
    handleSelectSectionIcon(icon) {
      this.selectedIcon = icon
    },

    async handleFindAllIcons() {
      this.loading = true

      await getAllIcons()
        .then(response => {
          this.icons = response.data
        })

      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables/variables';

  .card {
    margin-bottom: 0;
    cursor: pointer;
    border: 2px solid transparent
  }

  .selected-card {
    border: 2px solid $accent-300 !important;
    color: $accent-300 !important;
  }

  .card-body {
    padding: 10.34px;
  }

  .dark-layout .card {
    box-shadow: none;
  }

  .feather-icons {
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .feather-icons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
