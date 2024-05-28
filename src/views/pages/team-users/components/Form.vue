<template>
  <validation-observer
    ref="formUser"
  >
    <b-form>
      <b-row>
        <b-col
          sm="6"
          lg="4"
        >
          <b-form-group
            label="Nome"
            label-for="name"
          >
            <validation-provider
              #default="{ errors }"
              name="Nome"
              rules="required"
            >
              <b-form-input
                id="name"
                v-model="getFormData.name"
                autocomplete="off"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          sm="6"
          lg="4"
        >
          <b-form-group
            label="E-mail"
            label-for="email"
          >
            <validation-provider
              #default="{ errors }"
              name="E-mail"
              rules="required|email"
            >
              <b-form-input
                id="email"
                v-model="getFormData.email"
                placeholder="email@email.com"
                autocomplete="off"
                type="email"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          sm="6"
          lg="4"
        >
          <b-form-group
            label="Perfil"
            label-for="profile"
          >
            <validation-provider
              #default="{ errors }"
              name="Perfil"
              rules="required"
            >
              <v-select
                id="profile"
                v-model="getFormData.profile"
                :options="profiles"
                variant="custom"
                item-text="description"
                item-value="id"
                placeholder="Selecione um perfil"
                label="description"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

          </b-form-group>
        </b-col>

        <b-col
          sm="6"
          lg="4"
        >
          <b-form-group
            label="Projetos"
            label-for="projects"
          >
            <validation-provider
              #default="{ errors }"
              name="Projetos"
              rules="required"
            >
              <v-select
                id="projects"
                v-model="getFormData.projects"
                :options="projects"
                variant="custom"
                item-text="name"
                item-value="id"
                placeholder="Selecione um ou mais"
                label="name"
                :multiple="true"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          class="mt-3"
        >
          <ButtonForm
            class-name="mr-2"
            @action="formSubmit(true)"
          >
            <feather-icon
              icon="CheckIcon"
            />
            Salvar usuário
          </ButtonForm>

          <ButtonOutlineForm
            @action="cancel"
          >
            <feather-icon
              icon="XIcon"
            />
            Cancelar
          </ButtonOutlineForm>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
  email,
  password,
  confirmed,
} from '@validations'
import { statusForm } from '@core/utils/statusForm'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'
import vSelect from 'vue-select'
import { getAllProjects } from '@/views/pages/projects/api'
import { getAllProfiles } from '@/views/pages/admin-users/api'
import { createTeamUser, updateTeamUser } from '@/views/pages/team-users/api'
import { getArrayAttr } from '@core/utils/utils'

export default {
  components: {
    vSelect,
    ButtonOutlineForm,
    ButtonForm,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
  },

  props: {
    mode: {
      type: String,
      default: 'insert',
    },
  },

  data() {
    return {
      required,
      email,
      password,
      confirmed,

      statusForm,
      titlePage: '',

      redirect: false,

      formActions,

      profiles: [],

      projects: [],
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.$store.getters['teamUsers/getFormData']
    },
  },

  mounted() {
    this.index()
  },

  methods: {
    async index() {
      this.setLoading(true)

      await getAllProjects()
        .then(response => {
          this.projects = response.data
        })

      await getAllProfiles({ profileType: 'OPERATIONAL' })
        .then(response => {
          this.profiles = response.data
        })

      this.setLoading(false)
    },

    async formSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.formUser.validate()
          .then(success => {
            if (success) {
              resolve(true)
            }
          })
          .catch(() => {
            reject()
          })
      })

      if (await result) {
        await this.core()
      }
    },

    async core() {
      if (this.getMode === this.formActions.insertAction) {
        await this.handleCreateUser()
      }

      if (this.getMode === this.formActions.updateAction) {
        await this.handleUpdateUser()
      }
    },

    async handleCreateUser() {
      this.setLoading(true)

      const formData = {
        name: this.getFormData.name,
        email: this.getFormData.email,
        profileId: this.getFormData.profile.id,
        projectsId: getArrayAttr(this.getFormData.projects, 'id'),
      }

      await createTeamUser(formData)
        .then(response => {
          if (response.status === 201) {
            this.clear()

            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.setLoading(false)
    },

    async handleUpdateUser() {
      this.setLoading(true)

      const { id } = this.getFormData

      const formData = {
        name: this.getFormData.name,
        email: this.getFormData.email,
        profileId: this.getFormData.profile.id,
        projectsId: getArrayAttr(this.getFormData.projects, 'id'),
      }

      await updateTeamUser(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()

            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.setLoading(false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    setLoading(loading) {
      this.$emit('setLoading', loading)
    },

    cancel() {
      this.clear()
    },

    clear() {
      this.$store.commit('teamUsers/clearChooseTeamUser')

      this.$router.replace({ name: 'team-users' })
    },
  },
}
</script>
