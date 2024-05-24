<template>
  <Misc>
    <span class="icon-page-misc mb-2">
      <feather-icon icon="AlertCircleIcon" />
    </span>

    <div class="text-center mb-1">
      <h2 class="text-center">
        Página não encontrada
      </h2>
      <p class="text-center">
        Não foi possível carregar sua requisição.
      </p>
    </div>

    <load-button
      :message="getMessageButton"
      @action="handleRedirect"
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

  computed: {
    getMessageButton() {
      if (this.$store.getters['sessions/isLoggedIn']) {
        return 'Voltar para o início'
      }

      return 'Ir para o login'
    },
  },

  methods: {
    handleRedirect() {
      this.$router.replace({
        name: this.$store.getters['sessions/isLoggedIn']
          ? 'home'
          : 'auth-login',
      })
    },
  },
}
</script>
