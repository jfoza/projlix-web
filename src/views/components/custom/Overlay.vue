<template>
  <div
    class="overlay"
    :class="className"
  >
    <div
      :class="getOverlayArea"
    >
      <div
        v-if="getShow"
        class="loader-area"
      >
        <b-spinner />
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BSpinner,
  },

  props: {
    className: {
      type: String,
      default: '',
    },
    opacity: {
      type: String,
      default: '0.8',
    },
    show: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      overlayArea: 'overlay-area',
    }
  },

  computed: {
    getShow() {
      return this.show
    },

    getOverlayArea() {
      return this.getShow ? 'overlay-area' : ''
    },
  },

  methods: {

  },
}
</script>
<style>
  .overlay {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  .overlay .overlay-area {
    width: 100%;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    inset: 0;
    opacity: 1;
    backdrop-filter: blur(4px);
    border-radius: 0.428rem;
    z-index: 10;
  }

  .overlay .overlay-area .loader-area {
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 150px;
  }
</style>
