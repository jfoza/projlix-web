<template>
  <div class="p-card-form">
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
              label="Senha"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Senha"
                vid="Password"
                :rules="getMode === formActions.insertAction ? 'required|password' : 'password'"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="getFormData.password"
                    :type="password1FieldType"
                    class="form-control-merge"
                    name="reset-password-new"
                    placeholder="******"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password1ToggleIcon"
                      @click="togglePassword1Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            sm="6"
            lg="4"
          >
            <b-form-group
              label-for="reset-password-confirm"
              label="Confirmação de Senha"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirmação de Senha"
                :rules="getMode === formActions.insertAction ? 'required|confirmed:Password' : 'confirmed:Password'"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="getFormData.passwordConfirmation"
                    :type="password2FieldType"
                    class="form-control-merge"
                    name="reset-password-confirm"
                    placeholder="******"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password2ToggleIcon"
                      @click="togglePassword2Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
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
              @click="cancel"
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
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
  email,
  password,
  confirmed,
  noSpecialChars,
} from '@validations'
import { createUser, updateUser } from '@core/utils/requests/users'
import { statusForm } from '@core/utils/statusForm'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'

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
    BInputGroup,
    BInputGroupAppend,
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
      noSpecialChars,

      statusForm,
      titlePage: '',

      redirect: false,

      formActions,

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },

  computed: {
    getMode() {
      return this.mode
    },

    getFormData() {
      return this.$store.getters['adminUsers/getFormData']
    },

    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
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
        password: this.getFormData.password,
        passwordConfirmation: this.getFormData.passwordConfirmation,
      }

      await createUser(formData)
        .then(response => {
          if (response.status === 201) {
            this.clear()

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

      this.setLoading(false)
    },

    async handleUpdateUser() {
      this.setLoading(true)

      const { id } = this.getFormData

      const formData = {
        name: this.getFormData.name,
        email: this.getFormData.email,
        password: this.getFormData.password,
        passwordConfirmation: this.getFormData.passwordConfirmation,
      }

      await updateUser(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()

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

      this.setLoading(false)
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
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    setLoading(loading) {
      this.$emit('setLoading', loading)
    },

    cancel() {
      if (this.getMode === this.formActions.insertAction) {
        this.clear()
      } else {
        this.$router.replace({
          name: 'admin-users',
          params: {
            dispatchList: true,
          },
        })
      }
    },

    clear() {
      this.$store.commit('adminUsers/clearChooseAdminUser')

      this.$router.replace({ name: 'admin-users' })
    },

    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
  },
}
</script>
