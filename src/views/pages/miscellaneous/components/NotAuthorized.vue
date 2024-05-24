<template>
  <Misc v-if="view">
    <span class="icon-page-misc mb-2">
      <feather-icon icon="LockIcon" />
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
  </Misc>
</template>

<script>
import LoadButton from '@/views/components/custom/buttons/LoadButton.vue'
import {
  clearStore, logoutUserRedirectToLogin, setLoggedUserData,
} from '@/auth/utils'
import Misc from '@/views/pages/miscellaneous/components/Misc.vue'

export default {
  title: 'Página não autorizada',

  components: {
    Misc,
    LoadButton,
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