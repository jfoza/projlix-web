<template>
  <Main>
    <b-container fluid>
      <nav class="nav-login">
        <div class="mr-1">
          <application-logo img-width="124px" />
        </div>

        <div class="w-100 d-flex justify-content-end align-items-center ml-1">
          <p class="create-account-title">
            Não tem uma conta ?
          </p>

          <ButtonForm>
            <feather-icon icon="UserPlusIcon" />
          </ButtonForm>
        </div>
      </nav>

      <validation-observer ref="login">
        <b-row class="w-100 m-0">
          <b-col
            lg="12"
            class="d-flex justify-content-center"
          >
            <section class="card-auth-admin">
              <b-card-title
                class="mt-2 mb-1 text-center login-card-title"
                title-tag="h2"
              >
                Seja bem-vind@!
              </b-card-title>

              <b-alert
                v-if="alert.show"
                show
                fade
                variant="danger"
              >
                <div class="custom-alert">
                  <span>
                    <BIconExclamationCircle />
                    {{ alert.message }}
                  </span>
                </div>
              </b-alert>

              <google-button :disabled="loading" />

              <div class="divider my-1">
                <div class="divider-text">
                  ou
                </div>
              </div>

              <b-form
                class="w-100"
                @submit.prevent="formSubmit"
              >
                <!-- email -->
                <b-form-group
                  label="E-mail"
                  label-for="login-email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="E-mail"
                    rules="required|email"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="MailIcon" />
                      </b-input-group-prepend>

                      <b-form-input
                        id="login-email"
                        v-model="auth.email"
                        name="login-email"
                        :disabled="loading"
                        :state="errors.length > 0 ? false : null"
                        placeholder="email@email.com"
                        autocomplete="off"
                        @focus="alert.show = false"
                      />
                    </b-input-group>

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group
                  label="Senha"
                  label-for="login-password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Senha"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>

                      <b-form-input
                        id="login-password"
                        v-model="auth.password"
                        :disabled="loading"
                        :type="passwordFieldType"
                        class="form-control-merge"
                        :state="errors.length > 0 ? false : null"
                        placeholder="********"
                        @keyup.enter="formSubmit"
                      />

                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <LoginButton
                  class-name="w-100 mt-1 mb-2"
                  btn-text="Entrar"
                  :loading="loading"
                  @action="formSubmit"
                />
              </b-form>

              <b-link
                :to="{name: ''}"
                class="text-center"
              >
                <small>Esqueci minha senha</small>
              </b-link>
            </section>
          </b-col>
        </b-row>
      </validation-observer>
    </b-container>
  </Main>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from '@validations'
import ApplicationLogo from '@/views/components/custom/ApplicationLogo.vue'

import {
  BContainer,
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BInputGroupPrepend,
  BCardTitle,
  BForm,
  BAlert,
  VBTooltip,
  BIconExclamationCircle,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { messages } from '@core/utils/validations/messages'
import googleIcon from '@/assets/images/icons/custom/google.svg'
import GoogleButton from '@/views/components/custom/buttons/GoogleButton.vue'
import Main from '@/views/pages/authentication/components/Main.vue'
import LoginButton from '@/views/components/custom/buttons/LoginButton.vue'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    ButtonForm,
    LoginButton,
    Main,
    GoogleButton,
    ValidationObserver,
    ValidationProvider,
    ApplicationLogo,
    BContainer,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BInputGroupPrepend,
    BCardTitle,
    BForm,
    BAlert,
    BIconExclamationCircle,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      required,
      email,

      googleIcon,

      auth: {
        email: '',
        password: '',
      },

      alert: {
        show: false,
        message: '',
        variant: '',
      },

      state: true,

      loading: false,

      disabledButton: false,

      formErrors: {},
    }
  },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },

  watch: {
    state(value) {
      return value
    },
  },

  methods: {
    async formSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.login.validate()
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
        await this.handleLogin()
      }
    },

    async handleLogin() {
      this.loading = true

      await this.$store.dispatch('sessions/login', this.auth)
        .then(response => {
          const { status } = response.request
          const token = response.data.accessToken
          const userData = response.data.user

          if (status === 200 && token) {
            this.abilitySessionAndRedirect(userData)
          }
        })
        .catch(error => {
          this.errorHandling(error.response)
        })

      this.loading = false
    },

    // eslint-disable-next-line consistent-return
    abilitySessionAndRedirect(userData) {
      if (!userData.ability || userData.ability.length === 0) {
        this.$store.dispatch('sessions/logout').then()
        this.$router.replace({ name: 'misc-not-enabled' })

        return false
      }

      if (userData.status) {
        // eslint-disable-next-line no-param-reassign
        userData.status = 'active'
      }

      this.$ability.update(userData.ability)

      this.$router.replace(getHomeRouteForLoggedInUser('admin'))
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: `Bem-vindo(a) ${userData.fullName}`,
              icon: 'CoffeeIcon',
              variant: 'success',
              text: '',
            },
          })
        })
    },

    errorHandling(response) {
      const { status } = response
      const message = response.data.error ?? messages.impossible

      if (status === 401) {
        this.showAlert(
          message,
          'danger',
        )
      } else {
        this.showAlert(
          messages.impossible,
          'danger',
        )
      }
    },

    showAlert(message, variant) {
      this.alert.show = true
      this.alert.message = message
      this.alert.variant = variant
    },
  },
}
</script>

<style scoped lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
