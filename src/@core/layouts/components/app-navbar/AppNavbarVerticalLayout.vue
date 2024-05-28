<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <div
        v-if="getChooseProject.id !== '' && this.$route.name === 'project-tasks'"
        :style="getLeftItemsStyle"
      >
        <div class="dropdown">
          <b-dropdown
            variant="link"
            no-caret
            toggle-class="p-0"
            left
          >
            <template #button-content>
              <div class="left-area">
                <div class="left-area-icon">
                  <feather-icon
                    icon="AnchorIcon"
                    size="15"
                  />
                </div>

                <h6>{{ getChooseProject.name }}</h6>

                <feather-icon
                  icon="ChevronDownIcon"
                  size="17"
                  class="align-middle text-body ml-1"
                />
              </div>
            </template>
            <b-dropdown-item>
              <div class="dropdown-item-area">
                <feather-icon
                  icon="SettingsIcon"
                  class="mr-1"
                  size="24"
                />

                <span>Configurações do projeto</span>
              </div>
            </b-dropdown-item>

            <b-dropdown-item>
              <div class="dropdown-item-area">
                <feather-icon
                  icon="SmileIcon"
                  class="mr-1"
                  size="24"
                />

                <span>Alterar ícone</span>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BDropdown,
  BDropdownItem,
  BLink,
  BNavbarNav,
} from 'bootstrap-vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BDropdownItem,
    BDropdown,
    BLink,

    // Navbar Components
    BNavbarNav,
    UserDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

  computed: {
    getIsVerticalMenuCollapsed() {
      return this.$store.getters['verticalMenu/getIsVerticalMenuCollapsed']
    },

    getLeftItemsStyle() {
      return {
        marginLeft: this.getIsVerticalMenuCollapsed ? '80px' : '320px',
        transition: 'margin-left 0.15s ease',
      }
    },

    getChooseProject() {
      return this.$store.getters['projects/getChooseProjectInNavbar']
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables/variables';

  .left-area {
    display: flex;
  }

  .left-area .left-area-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $bg-300;
    color: #d0d2d6;
    overflow: hidden;
    border-radius: 100%;
  }

  .left-area h6 {
    margin: 0 0 0 7px;
    font-size: 17px;
    font-weight: 700;
  }

  .dropdown-item-area {
    display: flex;
    align-items: center;
  }

  .dropdown-item-area span {
    font-size: 15px;
  }
</style>
