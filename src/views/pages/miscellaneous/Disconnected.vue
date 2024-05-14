<template>
  <custom-misc>
    <span class="icon-page-misc mb-2">
      <CoffeeIcon />
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
  </custom-misc>
</template>

<script>
import CustomMisc from '@/views/components/custom/CustomMisc'
import LoadButton from '@/views/components/custom/LoadButton'
import { CoffeeIcon } from 'vue-feather-icons'

export default {
  components: {
    CustomMisc,
    LoadButton,
    CoffeeIcon,
  },

  methods: {
    handleRedirectToLogin() {
      this.$router.replace({ name: 'auth-login' })
    },
  },
}
</script>
