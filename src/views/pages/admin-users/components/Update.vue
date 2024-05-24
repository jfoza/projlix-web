<template>
  <div
    class="content-wrapper"
  >
    <b-overlay
      :show="loading"
      variant="transparent"
    >
      <page-header
        screen-name="Editar Usuário"
        :link-items="linkItems"
      />

      <div class="card p-card-form">
        <Form
          :mode="formActions.updateAction"
          @setLoading="setLoading"
        />
      </div>
    </b-overlay>
  </div>
</template>

<script>

import PageHeader from '@/views/components/custom/PageHeader.vue'
import { getUserId } from '@/views/pages/admin-users/api'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { BOverlay } from 'bootstrap-vue'
import { messages } from '@core/utils/validations/messages'
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
          name: 'Editar Usuário',
          active: true,
        },
        {
          name: '...',
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

          this.linkItems[2].name = this.$store.getters['adminUsers/getFormData'].name
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.setLoading(false)
    },

    redirectToMainPage() {
      this.$store.commit('adminUsers/clearFormData')
      this.$store.commit('adminUsers/clearChooseAdminUser')
      this.$router.replace({ name: 'admin-users' })
    },

    setLoading(loading) {
      this.loading = loading
    },
  },
}
</script>
