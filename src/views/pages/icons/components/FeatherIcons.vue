<template>
  <div
    class="icons"
    :style="getStyles"
  >
    <div
      v-for="icon in getIcons"
      :key="icon.id"
      v-b-tooltip.hover.top="icon.name"
      class="icon"
      :class="{ 'selected': getSelectedIcon.id === icon.id }"
      @click="handleSelectSectionIcon(icon)"
    >
      <div class="icon-wrapper">
        <feather-icon
          :icon="icon.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { VBTooltip } from 'bootstrap-vue'

export default {
  components: {

  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  props: {
    height: {
      type: String,
      default: '100%',
    },

    selectedIcon: {
      type: Object,
      default: () => null,
    },

    scroll: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getIcons() {
      return this.$store.getters['icons/getIcons']
    },

    getSelectedIcon() {
      const selectedIconAux = {
        id: '',
        name: '',
      }

      if (this.selectedIcon) {
        selectedIconAux.id = this.selectedIcon.id
        selectedIconAux.name = this.selectedIcon.name
      }

      return selectedIconAux
    },

    getStyles() {
      const styles = {}
      let scroll = {}

      if (this.scroll) {
        scroll = {
          overflowY: 'scroll',
          overflowX: 'hidden',
        }
      }

      return { ...scroll, ...styles }
    },
  },

  mounted() {
    this.index()
  },

  methods: {
    async index() {
      await this.$store.dispatch('icons/findAll')
    },

    handleSelectSectionIcon(icon) {
      this.$emit('update:selectedIcon', icon)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables/variables';

.icons {
  display: flex;
  flex-wrap: wrap;
  max-height: 200px;
}

.icons .icon {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  background-color: $bg-300;
  border-radius: 0.368rem;
  cursor: pointer;
}

.selected {
  border: 2px solid $accent-300;
}

.dark-layout .card {
  box-shadow: none;
}

.icon-wrapper .feather {
  height: 24px;
  width: 24px;
}

@media (max-width: 992px) {
  .icons .icon {
    width: 30px;
    height: 30px;
  }

  .icon-wrapper .feather {
    height: 18px;
    width: 18px;
  }
}
</style>
