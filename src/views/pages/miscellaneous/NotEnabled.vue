<template>
  <custom-misc>
    <span class="icon-page-misc mb-2">
      <LockIcon />
    </span>

    <div class="text-center mb-1">
      <h2 class="text-center">
        Acesso negado
      </h2>
      <p class="text-center">
        Você não tem permissão para acessar a plataforma.
        Para liberar ou verificar seu acesso entre em contato com o suporte.
      </p>
    </div>

    <load-button
      message="Voltar para o login"
      @action="handleRedirectToLogin"
    />
  </custom-misc>
</template>

<script>
import CustomMisc from '@/views/components/custom/CustomMisc'
import LoadButton from '@/views/components/custom/LoadButton'
import { LockIcon } from 'vue-feather-icons'

export default {
  components: {
    CustomMisc,
    LoadButton,
    LockIcon,
  },

  methods: {
    handleRedirectToLogin() {
      this.$router.replace({ name: 'auth-login' })
    },
  },
}
</script>
