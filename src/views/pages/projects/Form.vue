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
          <button
            type="button"
            class="btn btn-outline-primary button-custom-size  mr-1"
            @click="cancel"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="btn button-form button-custom-size"
            @click="formSubmit"
          >
            {{ textButton }}
          </button>
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
import { createProject, updateProject } from '@core/utils/requests/projects'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
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
            this.handleShowMessage(
              messages.successSave,
              'CheckIcon',
              'success',
            )
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
            this.handleShowMessage(
              messages.successSave,
              'CheckIcon',
              'success',
            )
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('projects/setLoading', false)
    },

    handleShowMessage(title, icon, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text: '',
          variant,
        },
      })
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return this.handleShowMessage(
          response.data.error,
          'AlertTriangleIcon',
          'warning',
        )
      }

      return this.handleShowMessage(
        messages.impossible,
        'AlertTriangleIcon',
        'warning',
      )
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
