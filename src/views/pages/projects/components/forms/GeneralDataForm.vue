<template>
  <validation-observer
    ref="formItems"
  >
    <b-form
      class="update-project-form"
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
      </b-row>

      <b-row>
        <b-col
          cols="12"
          class="mt-3 text-right"
        >
          <ButtonForm
            @action="formSubmit"
          >
            Salvar
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
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
} from '@validations'
import { messages } from '@core/utils/validations/messages'
import { updateProjectInfo } from '@/views/pages/projects/api'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import {toastSuccess, toastWarning} from '@/libs/alerts/toast'

export default {
  components: {
    ButtonForm,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
  },

  data() {
    return {
      required,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['projects/getFormData']
    },
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
        await this.handleUpdate()
      }
    },

    async handleUpdate() {
      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        name: this.getFormData.name,
        description: this.getFormData.description,
      }

      await updateProjectInfo(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.findAll()
            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('projects/setLoadingUpdate', false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    async findAll() {
      await this.$store.dispatch('projects/findAll')
    },

    clear() {
      this.$store.commit('projects/clearFormData')

      this.$store.commit('projects/setShowModalFormUpdate', false)
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
