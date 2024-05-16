<template>
  <overlay
    class-name="card"
    :show="loading"
  >
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
              sm="6"
              lg="4"
            >
              <b-form-group
                label="Perfil"
                label-for="profiles"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Perfil"
                  rules="required"
                >
                  <v-select
                    id="profiles"
                    v-model="getFormData.profile"
                    :disabled="getMode === formActions.updateAction"
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
              cols="12"
              class="mt-3"
            >
              <button
                type="button"
                class="btn button-form button-custom-size mr-2"
                @click="formSubmit(true)"
              >
                <feather-icon
                  icon="CheckIcon"
                />
                Salvar usuário
              </button>

              <button
                v-if="getMode === formActions.insertAction"
                type="button"
                class="btn button-form button-custom-size mr-2"
                @click="formSubmit(false)"
              >
                <feather-icon
                  icon="CheckIcon"
                />
                Salvar e cadastrar novo
              </button>

              <button
                type="button"
                class="btn btn-outline-danger button-custom-size"
                @click="cancel"
              >
                <feather-icon
                  icon="XIcon"
                />
                Cancelar
              </button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </div>
  </overlay>
</template>

<script>
/* eslint-disable import/extensions */
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
import { getProfiles, createUser, updateUser } from '@core/utils/requests/users'
import { statusForm } from '@core/utils/statusForm'
import vSelect from 'vue-select'
import { successMessage, warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import profileTypes from '@core/utils/profileTypes'
import Overlay from '@/views/components/custom/Overlay.vue'

export default {
  components: {
    Overlay,
    ValidationProvider,
    ValidationObserver,
    vSelect,
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

    formData: {
      type: Object,
      default: null,
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

      loading: true,

      profiles: [],

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
      return this.formData
    },

    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },

  mounted() {
    this.findAllProfiles()
  },

  methods: {
    async findAllProfiles() {
      this.loading = true

      await getProfiles({ profileTypeUniqueName: profileTypes.ADMINISTRATIVE })
        .then(response => {
          this.profiles = response.data
        })
        .catch(() => {
          this.profiles = []
        })

      this.loading = false
    },

    async formSubmit(redirect) {
      this.redirect = redirect

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
      this.loading = true

      const formData = {
        name: this.getFormData.name,
        email: this.getFormData.email,
        password: this.getFormData.password,
        passwordConfirmation: this.getFormData.passwordConfirmation,
        profileId: this.getFormData.profile.id,
      }

      await createUser(formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()
            successMessage(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.loading = false
    },

    async handleUpdateUser() {
      this.loading = true

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
            successMessage(messages.successSave)

            // setLoggedUserData()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.loading = false
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return warningMessage(response.data.error)
      }

      return warningMessage(messages.impossible)
    },

    cancel() {
      if (this.getMode === this.formActions.insertAction) {
        this.redirect = true
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
      this.$emit('clear')
      this.$store.commit('usersModuleStore/SET_CHOOSE_USER', null)

      if (this.redirect) {
        this.$router.replace({
          name: 'admin-users',
          params: {
            dispatchList: true,
          },
        })
      }
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

<style lang="scss" scoped>
@media(max-width: 400px) {
  .button-custom-size {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
