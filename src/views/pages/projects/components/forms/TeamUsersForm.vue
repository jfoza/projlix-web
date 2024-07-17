<template>
  <div class="update-project-form">
    <b-row>
      <b-col
        class="mb-2"
        cols="12"
      >
        <TeamUsersAutoSuggest
          ref="nameAutoSuggest"
          @focus="searchEmptyError = false"
          @setTeamUser="handleAddTeamUser"
        />
      </b-col>

      <b-col
        v-for="(teamUser, index) in getTeamUsers"
        :key="index"
        cols="12"
        class="mb-2"
      >
        <div
          class="project-team-user"
          @mouseover="hoveredTag = index"
          @mouseleave="hoveredTag = null"
        >
          <div class="team-user-info-left">
            <b-avatar
              :text="teamUser.short_name"
              size="36"
              variant="light-secondary"
              class="avatar-members mr-1"
            />
            <div class="d-flex flex-column">
              <h6 class="m-0">
                {{ teamUser.name }}
              </h6>
              <small>
                {{ teamUser.email }}
              </small>
            </div>
          </div>

          <div class="team-user-info-right">
            <ButtonIcon
              v-if="teamUser.can && hoveredTag === index"
              feather-icon="XIcon"
              @action="openModalRemove(teamUser)"
            />

            <small />

            <small>
              {{ teamUser.profile }}
            </small>
          </div>

          <div class="team-user-info-small">
            <small class="mt-1 mb-1">
              {{ teamUser.profile }}
            </small>

            <button
              v-if="teamUser.can"
              type="button"
              class="btn btn-outline-danger"
              @click="openModalRemove(teamUser)"
            >
              Remover
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BAvatar } from 'bootstrap-vue'
import ButtonIcon from '@/views/components/custom/buttons/ButtonIcon.vue'
import {
  removeProjectTeamUser,
  updateProjectTeamUser,
} from '@/views/pages/projects/api'
import { toastWarning } from '@/libs/alerts/toast'
import { messages } from '@core/utils/validations/messages'
import TeamUsersAutoSuggest from '@/views/pages/projects/components/TeamUsersAutoSuggest.vue'
import { confirmAction } from '@/libs/alerts/sweetalerts'

export default {
  components: {
    BAvatar,
    TeamUsersAutoSuggest,
    ButtonIcon,
    BRow,
    BCol,
  },

  data() {
    return {
      searchEmptyError: false,

      hoveredTag: null,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['projects/getFormData']
    },

    getTeamUsers() {
      return this.getFormData.teamUsers
    },

    getLoggedUser() {
      return this.$store.getters['sessions/getUserData']
    },
  },

  methods: {
    async handleAddTeamUser(teamUser) {
      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        teamUserId: teamUser.team_user_id,
      }

      await updateProjectTeamUser(id, formData)
        .then(response => {
          if (response.status === 204) {
            this.clearAutoSuggest()

            this.findProjects()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('projects/setLoadingUpdate', false)
    },

    async findProjects() {
      await this.$store.dispatch('projects/findOne', this.getFormData.id)
      await this.$store.dispatch('projects/findAll')
    },

    openModalRemove(teamUser) {
      confirmAction(messages.confirmRemoveProjectTeamUser)
        .then(() => {
          this.handleRemoveProjectTeamUser(teamUser)
        })
        .catch()
    },

    async handleRemoveProjectTeamUser(teamUser) {
      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        teamUserId: teamUser.team_user_id,
      }

      await removeProjectTeamUser(id, formData)
        .then(response => {
          if (response.status === 204) {
            this.clearAutoSuggest()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      if (this.getLoggedUser.id === teamUser.id) {
        await this.$store.dispatch('projects/findAll')

        this.$store.commit('projects/setShowModalFormUpdate', false)
      } else {
        await this.$store.dispatch('projects/findOne', this.getFormData.id)
        await this.$store.dispatch('projects/findAll')
      }

      this.$store.commit('projects/setLoadingUpdate', false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    clearAutoSuggest() {
      this.$refs.nameAutoSuggest.chooseTeamUser = null
      this.$refs.nameAutoSuggest.results = []
      this.$refs.nameAutoSuggest.result = []
      this.$refs.nameAutoSuggest.suggestions = []
      this.$refs.nameAutoSuggest.selected = null
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables/variables';

.project-team-user {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px 8px 15px;
  border-radius: 0.358rem;
  background-color: $bg-300;
}

.project-team-user .team-user-info-left {
  height: 100%;
  display: flex;
  align-items: center;
}

.project-team-user .team-user-info-right {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
}

.project-team-user .team-user-info-small {
  display: none;
}

@media (width < 545px) {
  .project-team-user {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .project-team-user .team-user-info-right {
    display: none;
  }

  .project-team-user .team-user-info-small {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
