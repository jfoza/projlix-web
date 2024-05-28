<template>
  <div
    class="kanban-title"
    :style="getSectionColorRgba"
  >
    <div
      class="kanban-title-content"
      :style="getSectionColorHexadecimal"
    >
      <feather-icon
        :icon="getSectionIconName"
        size="18"
      />
      <h4>{{ getSectionName }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sectionColorRgba: {
      type: String,
      default: '',
    },

    sectionColorHexadecimal: {
      type: String,
      default: '',
    },

    sectionIconName: {
      type: String,
      default: '',
    },

    sectionName: {
      type: String,
      default: '',
    },
  },

  computed: {
    getSectionColorRgba() {
      return { backgroundColor: this.sectionColorRgba }
    },

    getSectionColorHexadecimal() {
      return { backgroundColor: this.sectionColorHexadecimal }
    },

    getSectionIconName() {
      return this.sectionIconName
    },

    getSectionName() {
      return this.sectionName
    },
  },
}
</script>
