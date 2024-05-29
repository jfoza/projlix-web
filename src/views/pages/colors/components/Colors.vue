<template>
  <div>
    <div
      v-if="getLoading"
      class="spinner-area"
    >
      <b-spinner />
    </div>

    <section
      v-if="!getLoading"
      class="colors-container"
    >
      <div
        v-for="color in getColors"
        :key="color.id"
        v-b-tooltip.hover.top="color.name"
        class="color-border"
        :class="{ 'selected': getSelectedColor.id === color.id }"
      >
        <div
          :style="{ backgroundColor: color.hexadecimal }"
          class="color-circle"
          @click="selectColor(color)"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { BSpinner, VBTooltip } from 'bootstrap-vue'

export default {
  components: { BSpinner },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {}
  },

  computed: {
    getColors() {
      return this.$store.getters['colors/getColors']
    },

    getSelectedColor() {
      return this.$store.getters['colors/getSelectedColor']
    },

    getLoading() {
      return this.$store.getters['colors/getLoading']
    },
  },

  mounted() {
    this.index()
  },

  methods: {
    async index() {
      await this.$store.dispatch('colors/findAll')

      if (!this.getSelectedColor.id) {
        const defaultColor = this.getColors[0]

        if (defaultColor) {
          this.$store.commit('colors/setSelectedColor', defaultColor)
        }
      }
    },

    selectColor(color) {
      this.$store.commit('colors/setSelectedColor', color)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables/variables';

.colors-container {
  display: flex;
  flex-wrap: wrap;
}

.color-border {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.color-border.selected {
  border-color: $accent-300;
}

.color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
