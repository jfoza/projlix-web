<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
<!--        <p class="user-name font-weight-bolder mb-0">-->
<!--          {{ userData.fullName || userData.username }}-->
<!--        </p>-->
        <!--        <span class="user-status">{{ userData.role }}</span>-->
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        class="badge-minimal"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="redirectMyAccount"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Minha Conta</span>
    </b-dropdown-item>

    <!--    <b-dropdown-item-->
    <!--      :to="{ name: ''}"-->
    <!--      link-class="d-flex align-items-center"-->
    <!--    >-->
    <!--      <feather-icon-->
    <!--        size="16"-->
    <!--        icon="HelpCircleIcon"-->
    <!--        class="mr-50"-->
    <!--      />-->
    <!--      <span>Ajuda e Suporte</span>-->
    <!--    </b-dropdown-item>-->

    <b-dropdown-item
      :to="{ name: 'terms-of-use'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="FileTextIcon"
        class="mr-50"
      />
      <span>Termos de uso</span>
    </b-dropdown-item>

    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Sair</span>
    </b-dropdown-item>

  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BAvatar,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import { getUserData, logoutUser } from '@/auth/utils'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },
  data() {
    return {
      userData: getUserData(),
      avatarText,
    }
  },
  methods: {
    redirectMyAccount() {
      const { id } = getUserData()

      this.$store.commit('adminUsers/setChooseAdminUser', id)

      this.$router.replace({ name: 'update-user-form' })
    },

    logout() {
      logoutUser()
        .then(() => {
          this.$router.push({ name: 'auth-login' })
        })
        .catch(() => {
          this.$router.push({ name: 'auth-login' })
        })
    },
  },
}
</script>
