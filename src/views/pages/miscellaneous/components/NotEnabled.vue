<template>
  <Misc>
    <span class="icon-page-misc mb-2">
      <feather-icon icon="LockIcon" />
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
