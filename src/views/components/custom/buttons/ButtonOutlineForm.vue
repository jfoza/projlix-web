<template>
  <button
    type="button"
    class="btn button-outline-form"
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

.button-outline-form {
  background-color: transparent;
  border: solid 1px $accent-300;
  color: $accent-300 !important;
  transition: .3s background-color;
}

.button-outline-form:hover {
  background-color: transparent;
  border: solid 1px $accent-300;
  color: $accent-300 !important;
  text-decoration: underline;
}

@media(max-width: 400px) {
  .button-form {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
