<template>
  <button
    type="button"
    :disabled="disabled"
    class="btn custom-btn-google w-100"
    @click="action"
  >
    <b-img
      :src="googleIcon"
      class="google-icon"
    />
    Continuar com google
  </button>
</template>

<script>
import { BImg } from 'bootstrap-vue'
import googleIcon from '@/assets/images/icons/custom/google.svg'

export default {
  components: { BImg },
  props: {
    color: {
      type: String,
      default: '#2772C0',
    },
    size: {
      type: String,
      default: '18',
    },
    featherIcon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      googleIcon,
    }
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

.google-icon {
  width: 18px;
  margin-right: 1rem;
}

.custom-btn-google {
  background-color: transparent;
  border: solid 1px $bg-200;
  color: $bg-200;
  transition: .3s background-color;
}

.custom-btn-google:hover {
  background-color: transparent;
  border: solid 1px $bg-200;
  color: $bg-200;
  text-decoration: underline;
}
</style>
