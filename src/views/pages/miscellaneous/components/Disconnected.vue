<template>
  <Misc>
    <span class="icon-page-misc mb-2">
      <feather-icon icon="CoffeeIcon" />
    </span>

    <div class="text-center mb-1">
      <h2 class="text-center">
        Você foi desconectado!
      </h2>
      <p class="text-center">
        Sua sessão expirou. Faça novamente o login para acessar a plataforma.
      </p>
    </div>

    <load-button
      message="Ir para o login"
      @action="handleRedirectToLogin"
    />
  </Misc>
</template>

<script>
import LoadButton from '@/views/components/custom/buttons/LoadButton.vue'
import Misc from '@/views/pages/miscellaneous/components/Misc.vue'

export default {
  components: {
    Misc,
    LoadButton,
  },

  methods: {
    handleRedirectToLogin() {
      this.$router.replace({ name: 'auth-login' })
    },
  },
}
</script>
