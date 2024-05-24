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
import { BOverlay } from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import { formActions } from '@core/utils/formActions'
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

      loading: true,
    }
  },

  mounted() {
    this.$store.commit('teamUsers/clearFormData')
  },

  methods: {
    setLoading(loading) {
      this.loading = loading
    },
  },
}
</script>
