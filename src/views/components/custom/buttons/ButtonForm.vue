<template>
  <button
    type="button"
    class="btn button-form"
    :class="className"
    @click="action"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
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
@import '@/assets/scss/variables/variables';

.button-form {
  background-color: $primary-100 !important;
  color: $white !important;
  transition: .5s background-color !important;
}

.button-form:hover {
  background-color: $primary-100-hover !important;
  color: $white !important;
}

@media(max-width: 400px) {
  .button-form {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
