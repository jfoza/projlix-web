<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Novo"
      :link-items="linkItems"
    />

    <b-overlay
      :show="loading"
      variant="transparent"
    >
      <div class="card p-card-form">
        <Form
          :mode="formActions.insertAction"
          @setLoading="setLoading"
        />
      </div>
    </b-overlay>
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { formActions } from '@core/utils/formActions'
import { BOverlay } from 'bootstrap-vue'
import Form from './Form.vue'

export default {
  components: {
    BOverlay,
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
