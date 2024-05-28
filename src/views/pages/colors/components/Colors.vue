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
      class="colors-container"
    >
      <div
        v-for="color in colors"
        :key="color.id"
        v-b-tooltip.hover.top="color.name"
        class="color-border"
        :class="{ 'selected': selectedColor.id === color.id }"
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
import { getAllColors } from '@/views/pages/colors/api'

export default {
  components: { BSpinner },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      colors: [],

      selectedColor: { id: '' },

      loading: true,
    }
  },

  mounted() {
    this.handleFIndAllColors()
  },

  methods: {
    selectColor(color) {
      this.selectedColor = color
    },

    async handleFIndAllColors() {
      this.loading = true

      await getAllColors()
        .then(response => {
          this.colors = response.data
        })

      this.loading = false
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
