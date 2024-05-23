<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Novo"
      :link-items="linkItems"
    />

    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <Form
      :mode="formActions.insertAction"
      @setLoading="setLoading"
    />
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { formActions } from '@core/utils/formActions'
import { BSpinner } from 'bootstrap-vue'
import Form from './Form.vue'

export default {
  components: {
    BSpinner,
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar Usuários',
          routeName: 'admin-users',
        },
        {
          name: 'Cadastrar Novo',
          active: true,
        },
      ],

      formActions,

      loading: false,
    }
  },

  mounted() {
    this.$store.commit('adminUsers/clearFormData')
  },

  methods: {
    setLoading(loading) {
      this.loading = loading
    },
  },
}
</script>
