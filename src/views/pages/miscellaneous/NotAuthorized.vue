<template>
  <custom-misc v-if="view">
    <span class="icon-page-misc mb-2">
      <LockIcon />
    </span>

    <div class="text-center mb-1">
      <h2 class="text-center">
        Acesso negado
      </h2>
      <p class="text-center">
        Você não tem permissão para acessar este recurso.
        Para liberar ou verificar seu acesso entre em contato com o suporte.
      </p>
    </div>

    <load-button
      message="Voltar ao início"
      @action="handleRedirect"
    />
  </custom-misc>
</template>

<script>
/* eslint-disable import/extensions */
import CustomMisc from '@/views/components/custom/CustomMisc'
import LoadButton from '@/views/components/custom/LoadButton'
import { LockIcon } from 'vue-feather-icons'
import {
  clearStore, logoutUserRedirectToLogin, setLoggedUserData,
} from '@/auth/utils'

export default {
  title: 'Página não autorizada',

  components: {
    LoadButton,
    CustomMisc,
    LockIcon,
  },

  data() {
    return {
      view: false,

      countClicks: 0,
    }
  },

  created() {
    if (this.$store.getters['sessions/isLoggedIn']) {
      this.view = true
    } else {
      clearStore()
      this.$router.replace({ name: 'auth-login' })
    }
  },

  methods: {
    handleRedirect() {
      setLoggedUserData()

      this.countClick()
      this.$router.replace({ name: 'home' })
    },

    countClick() {
      // eslint-disable-next-line no-plusplus
      this.countClicks++

      if (this.countClicks > 1) {
        logoutUserRedirectToLogin()

        return false
      }

      return true
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
