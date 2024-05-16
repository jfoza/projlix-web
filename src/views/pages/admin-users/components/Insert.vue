<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Cadastrar Novo"
      :link-items="linkItems"
    />

    <Form
      :mode="formActions.insertAction"
      :form-data="form"
      @clear="clearForm"
    />
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { formActions } from '@core/utils/formActions'
import Form from './Form.vue'

export default {
  components: {
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar Usuários',
          routeName: '',
        },
        {
          name: 'Cadastrar Novo',
          active: true,
        },
      ],

      formActions,

      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        profile: null,
      },
    }
  },

  methods: {
    clearForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        profile: null,
        active: {
          boolValue: true,
          description: 'Ativo',
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
