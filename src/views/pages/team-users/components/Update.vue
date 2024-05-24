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
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { BOverlay } from 'bootstrap-vue'
import { getTeamUserId } from '@/views/pages/team-users/api'
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
    getChooseTeamUser() {
      return this.$store.getters['teamUsers/getChooseTeamUser']
    },
  },

  created() {
    if (!this.getChooseTeamUser.user.id) {
      this.redirectToMainPage()

      return false
    }

    return this.handleGetChooseTeamUser()
  },

  methods: {
    async handleGetChooseTeamUser() {
      this.setLoading(true)

      await getTeamUserId(this.getChooseTeamUser.user.id)
        .then(response => {
          const {
            user,
            projects,
          } = response.data

          this.$store.commit('teamUsers/setFormData', {
            id: user.id,
            name: user.name,
            email: user.email,
            profile: user.profile.length > 0 ? user.profile[0] : null,
            projects,
          })

          this.linkItems[2].name = this.$store.getters['teamUsers/getFormData'].name
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.setLoading(false)
    },

    redirectToMainPage() {
      this.$store.commit('teamUsers/clearFormData')
      this.$store.commit('teamUsers/clearChooseTeamUser')
      this.$router.replace({ name: 'team-users' })
    },

    setLoading(loading) {
      this.loading = loading
    },
  },
}
</script>
