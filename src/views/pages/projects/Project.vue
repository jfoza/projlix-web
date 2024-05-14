<template>
  <div
    class="project-card"
  >
    <section class="project-card-title">
      <h5>{{ getProjectInfo.name }}</h5>

      <div class="dropdown">
        <b-dropdown
          variant="link"
          no-caret
          toggle-class="p-0"
          right
        >
          <template #button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="17"
              class="align-middle text-body"
            />
          </template>
          <b-dropdown-item @click="handleGetProject">
            <feather-icon
              icon="Edit2Icon"
            />

            Editar
          </b-dropdown-item>

          <b-dropdown-item @click="openModalRemove">
            <feather-icon
              icon="XIcon"
            />

            Excluir
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </section>

    <section class="project-card-description">
      <small>
        {{ getProjectInfo.description }}
      </small>

      <hr>
    </section>

    <section class="project-card-members">
      <div class="members">
        <b-avatar
          v-for="(member, index) in getProjectInfo.teamUsers"
          :key="index"
          :text="member.user.short_name"
          size="25"
          variant="light-secondary"
          class="avatar-members"
        />
      </div>

      <div class="new-member">
        <button-icon
          size="18"
          feather-icon="PlusIcon"
        />
      </div>
    </section>

    <section class="project-card-view">
      <div class="divider-btn-eye" />

      <div class="project-btn-view">
        <button
          type="button"
          class="btn btn-link"
        >
          <feather-icon
            icon="PlusIcon"
            size="16"
          />

          Ver detalhes
        </button>
      </div>
    </section>
  </div>
</template>

<script>

import { BAvatar, BDropdown, BDropdownItem } from 'bootstrap-vue'
import ButtonIcon from '@/views/components/custom/ButtonIcon.vue'
import { removeProject, showProjectId } from '@core/utils/requests/projects'
import { messages } from '@core/utils/validations/messages'
import { confirmAction } from '@/libs/alerts/sweetalerts'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {

  components: {
    ButtonIcon,
    BAvatar,
    BDropdown,
    BDropdownItem,
  },

  props: {
    projectInfo: {
      type: Object,
      default: () => null,
    },
  },

  computed: {
    getProjectInfo() {
      const projectInfoAux = {
        id: '',
        name: '',
        description: '',
        members: [],
        teamUsers: [],
      }

      if (this.projectInfo) {
        projectInfoAux.id = this.projectInfo.id
        projectInfoAux.name = this.projectInfo.name
        projectInfoAux.description = this.projectInfo.description
        projectInfoAux.members = this.projectInfo.members
        projectInfoAux.teamUsers = this.projectInfo.team_users
      }

      return projectInfoAux
    },
  },

  methods: {
    async handleGetProject() {
      this.$store.commit('projects/setMode', 'update')

      await this.$store.dispatch('projects/findOne', this.getProjectInfo.id)
        .then(() => {
          this.$store.commit('projects/setShowModalForm', true)
        })
    },

    async findAll() {
      await this.$store.dispatch('projects/findAll')
    },

    openModalRemove() {
      confirmAction(messages.confirmDelete)
        .then(() => {
          this.handleRemoveItem()
        })
        .catch()
    },

    async handleRemoveItem() {
      this.$store.commit('projects/setLoading', true)

      await removeProject(this.getProjectInfo.id)
        .then(response => {
          if (response.status === 204) {
            this.findAll()

            this.handleShowMessage(
              messages.successDelete,
              'CheckIcon',
              'success',
            )
          }
        })
        .catch(error => {
          const errors = error.response.status === 400 || error.response.status === 404

          if (errors) {
            return this.handleShowMessage(
              error.response.data.error,
              'AlertTriangleIcon',
              'warning',
            )
          }

          return this.handleShowMessage(
            messages.impossible,
            'AlertTriangleIcon',
            'warning',
          )
        })

      this.$store.commit('projects/setLoading', false)
    },

    handleShowMessage(title, icon, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text: '',
          variant,
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables/variables';

.mr-03 {
  margin-right: .3rem;
}

.project-card {
  width: 100%;
  height: 254px;
  border-radius: 0.428rem;
  background-color: $bg-200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-card-title,
.project-card-description,
.project-card-members {
  padding: 1rem;
}

.project-card .project-card-title {
  display: flex;
  justify-content: space-between;
}

.project-card .project-card-members {
  display: flex;
  justify-content: space-between;
}

.project-card .project-card-members .members {
  display: flex;
}

.project-card .avatar-members {
  margin-right: .2rem;
}

.project-card .divider-btn-eye {
  border-top: 4px solid $bg-100;
}

.project-card .project-btn-view {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card .project-btn-view p {
  margin: 0;
  font-size: 12px;
}

.project-card .project-card-description small {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
