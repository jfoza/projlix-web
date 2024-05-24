<template>
  <button
    :disabled="!getState"
    :type="type"
    class="btn"
    :style="getStyles"
    @click="actionButton"
  >
    <b-spinner
      v-if="!getState"
      variant="custom"
    />
    <span v-else>{{ getMessage }}</span>
  </button>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {

  components: {
    BSpinner,
  },
  props: {
    state: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    message: {
      type: String,
      default: 'Submit',
    },
    bgColor: {
      type: String,
      default: '#7367f0',
    },
    color: {
      type: String,
      default: '#fff',
    },
  },

  data() {
    return {
      disabled: false,
    }
  },

  computed: {
    getStyles() {
      return {
        width: '100%',
        backgroundColor: this.bgColor,
        color: this.color,
        transition: '.3s background-color',
        marginBottom: '2rem',
      }
    },

    getState() {
      return this.state
    },

    getMessage() {
      return this.message
    },
  },

  methods: {
    actionButton() {
      this.$emit('action')
    },
  },
}
</script>

<style scoped>

</style>
