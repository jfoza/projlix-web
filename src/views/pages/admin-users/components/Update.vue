<template>
  <div
    v-if="getValidation"
    class="content-wrapper"
  >
    <page-header
      screen-name="Editar Usuário"
      :link-items="linkItems"
    />

    <Form
      ref="form"
      :mode="formActions.updateAction"
      :form-data="form"
      @clear="clearForm"
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
          name: 'Editar Usuário',
          active: true,
        },
      ],

      validation: false,

      formActions,

      userStore: {
        id: '',
      },

      form: {
        id: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        profile: null,
      },
    }
  },

  computed: {
    getValidation() {
      return this.validation
    },
  },

  // eslint-disable-next-line consistent-return
  created() {
    if (!this.userStore) {
      this.redirectToMainPage()

      return false
    }

    this.validation = true
  },

  mounted() {
    this.getChooseUser()
  },

  methods: {
    async getChooseUser() {
      this.$refs.form.loading = true

      await getUserId(this.userStore.id)
        .then(response => {
          const {
            id,
            name,
            email,
            profile,
            active,
          } = response.data

          this.form = {
            id,
            name,
            email,
            profile,
            active: {
              boolValue: active,
              description: active ? 'Ativo' : 'Inativo',
            },
          }
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.$refs.form.loading = false
    },

    redirectToMainPage() {
      this.clearForm()
      this.$store.commit('usersModuleStore/SET_CHOOSE_USER', null)
      this.$router.replace({ name: 'home' })
    },

    clearForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        active: {
          boolValue: true,
          description: 'Ativo',
        },
        profile: null,
      }
    },
  },
}
</script>
