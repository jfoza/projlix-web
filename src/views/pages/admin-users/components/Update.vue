<template>
  <div
    class="content-wrapper"
  >
    <page-header
      screen-name="Editar Usuário"
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
      :mode="formActions.updateAction"
      @setLoading="setLoading"
    />
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions
import PageHeader from '@/views/components/custom/PageHeader'
import { getUserId } from '@core/utils/requests/users'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
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
          name: 'Editar Usuário',
          active: true,
        },
      ],

      loading: true,

      formActions,
    }
  },

  computed: {
    getChooseAdminUser() {
      return this.$store.getters['adminUsers/getChooseAdminUser']
    },
  },

  created() {
    if (!this.getChooseAdminUser.id) {
      this.redirectToMainPage()

      return false
    }

    return this.getChooseUser()
  },

  methods: {
    async getChooseUser() {
      this.setLoading(true)

      await getUserId(this.getChooseAdminUser.id)
        .then(response => {
          const {
            id,
            name,
            email,
            profile,
            active,
          } = response.data

          this.$store.commit('adminUsers/setFormData', {
            id,
            name,
            email,
            profile,
            active: {
              boolValue: active,
              description: active ? 'Ativo' : 'Inativo',
            },
          })
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.setLoading(false)
    },

    redirectToMainPage() {
      this.clearForm()
      this.$store.commit('adminUsers/clearChooseAdminUser')
      this.$router.replace({ name: 'admin-users' })
    },

    setLoading(loading) {
      this.loading = loading
    },
  },
}
</script>
