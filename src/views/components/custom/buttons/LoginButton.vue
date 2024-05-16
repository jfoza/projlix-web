<template>
  <button
    type="button"
    class="btn custom-btn-login"
    :class="className"
    @click="action"
  >
    <b-spinner
      v-if="getLoading"
      variant="custom"
    />

    <span v-if="!getLoading">{{ btnText }}</span>
  </button>
</template>

<script>

import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },
  props: {
    btnText: {
      type: String,
      default: '',
    },

    className: {
      type: String,
      default: '',
    },

    loading: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    getLoading() {
      return this.loading
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

.custom-btn-login {
  background: linear-gradient(118deg, $primary-100, rgba(39, 131, 80, 0.7)) !important;
  border: none !important;
  color: $white;
  transition: .3s background-color;
}

.custom-btn-login:hover {
  background: linear-gradient(118deg, $primary-100, rgba(39, 131, 80, 0.7)) !important;
  border: none !important;
  color: $white;
}
</style>
