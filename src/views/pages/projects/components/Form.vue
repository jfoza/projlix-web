<template>
  <validation-observer
    ref="formItems"
  >
    <div
      v-if="getLoading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <b-form
      v-if="!getLoading"
      class="p-1"
    >
      <b-row>
        <b-col
          cols="12"
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
                :state="errors.length > 0 ? false : null"
                autocomplete="off"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Descrição"
            label-for="description"
          >
            <b-form-textarea
              id="description"
              v-model="getFormData.description"
              autocomplete="off"
              rows="3"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          class="mt-3 text-right"
        >
          <ButtonOutlineForm
            class-name="mr-1"
            @action="cancel"
          >
            Cancelar
          </ButtonOutlineForm>

          <ButtonForm
            @action="formSubmit"
          >
            {{ textButton }}
          </ButtonForm>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
/* eslint-disable import/extensions */
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BSpinner,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
} from '@validations'
import { messages } from '@core/utils/validations/messages'
import { createProject, updateProject } from '@/views/pages/projects/api/projects'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'

export default {
  components: {
    ButtonOutlineForm,
    ButtonForm,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
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
      titlePage: '',

      textButton: '',
    }
  },

  computed: {
    getMode() {
      return this.$store.getters['projects/getMode']
    },

    getFormData() {
      return this.$store.getters['projects/getProject']
    },

    getLoading() {
      return this.$store.getters['projects/getLoading']
    },
  },

  mounted() {
    if (this.getMode === 'insert') {
      this.textButton = 'Criar projeto'
    }

    if (this.getMode === 'update') {
      this.textButton = 'Editar projeto'
    }
  },

  methods: {
    async formSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.formItems.validate()
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
      if (this.getMode === 'insert') {
        await this.handleCreate()
      }

      if (this.getMode === 'update') {
        await this.handleUpdate()
      }
    },

    async handleCreate() {
      this.$store.commit('projects/setLoading', true)

      const formData = {
        name: this.getFormData.name,
        description: this.getFormData.description,
      }

      await createProject(formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()
            this.findAll()
            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('projects/setLoading', false)
    },

    async handleUpdate() {
      this.$store.commit('projects/setLoading', true)

      const { id } = this.getFormData

      const formData = {
        name: this.getFormData.name,
        description: this.getFormData.description,
      }

      await updateProject(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()
            this.findAll()
            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('projects/setLoading', false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    cancel() {
      this.$store.commit('projects/clear')

      this.$store.commit('projects/setShowModalForm', false)
    },

    async findAll() {
      await this.$store.dispatch('projects/findAll')
    },

    clear() {
      this.$store.commit('projects/clear')

      this.$store.commit('projects/setShowModalForm', false)
    },
  },
}
</script>

<style lang="scss" scoped>
@media(max-width: 400px) {
  .button-custom-size {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
