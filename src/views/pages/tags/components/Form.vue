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
              rules="required|noSpecialChars"
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
            Salvar tag
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
} from '@validations'
import { statusForm } from '@core/utils/statusForm'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'
import { createTag, updateTag } from '@/views/pages/tags/api'

export default {
  components: {
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
      return this.$store.getters['tags/getFormData']
    },
  },

  methods: {
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
        await this.handleCreateTag()
      }

      if (this.getMode === this.formActions.updateAction) {
        await this.handleUpdateTag()
      }
    },

    async handleCreateTag() {
      this.setLoading(true)

      const formData = {
        name: this.getFormData.name,
      }

      await createTag(formData)
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

    async handleUpdateTag() {
      this.setLoading(true)

      const { id } = this.getFormData

      const formData = {
        name: this.getFormData.name,
      }

      await updateTag(id, formData)
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
      this.$store.commit('tags/clearChooseTag')

      this.$router.replace({ name: 'tags' })
    },
  },
}
</script>
