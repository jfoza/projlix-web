<template>
  <b-badge
    :variant="getStatus ? 'light-success' : 'light-danger'"
    class="custom-badge"
  >
    {{ getStatus ? 'Ativo' : 'Inativo' }}
  </b-badge>
</template>

<script>
import { BBadge } from 'bootstrap-vue'

export default {
  name: 'StatusField',

  components: {
    BBadge,
  },

  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    getStatus() {
      return this.status
    },
  },
}
</script>

<style scoped>
  .custom-badge {
    border-radius: 10px;
  }
</style>
