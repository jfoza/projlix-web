<template>
  <button
    type="button"
    class="btn custom-btn-badge"
    :class="className"
    :style="getStyles"
    @click="action"
  >
    <feather-icon
      size="14"
      :icon="featherIcon"
    />

    <span>
      {{ buttonText }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
    featherIcon: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#d0d2d6',
    },
    bgColor: {
      type: String,
      default: '#2772C0',
    },
  },

  computed: {
    getStyles() {
      return {
        backgroundColor: this.bgColor,
        color: this.color,
      }
    },
  },

  methods: {
    action() {
      this.$emit('action')
    },
  },
}
</script>

<style scoped lang="scss">

.custom-btn-badge {
  padding: .3rem .5rem;
  border-radius: 10px;
  font-size: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-btn-badge span {
  margin-left: .2rem;
}
</style>
