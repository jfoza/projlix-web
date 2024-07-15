<template>
  <div class="update-project-form ml-1">
    <label class="mb-2">Escolha o ícone do projeto.</label>

    <div
      class="icons"
    >
      <div
        v-for="(icon, index) in icons"
        :key="index"
        v-b-tooltip.hover.top="icon"
        class="icon"
        :class="{ selected: icon.id === getFormData.icon.id && getFormData.icon.id !== '' }"
        @click="selectIcon(icon)"
      >
        <div class="icon-wrapper">
          <feather-icon
            :icon="icon.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VBTooltip } from 'bootstrap-vue'
import { getAllIcons } from '@/views/pages/icons/api'
import { updateProjectIcon } from '@/views/pages/projects/api'
import { toastWarning } from '@/libs/alerts/toast'
import { messages } from '@core/utils/validations/messages'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      icons: [],
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['projects/getFormData']
    },

    getProjects() {
      return this.$store.getters['projects/getProjects']
    },
  },

  mounted() {
    this.findAllIcons()
  },

  methods: {
    findAllIcons() {
      getAllIcons().then(response => {
        if (response.status === 200) {
          this.icons = response.data
        }
      })
    },

    async selectIcon(icon) {
      this.$store.commit('projects/setProjectIcon', icon)

      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        iconId: icon.id,
      }

      await updateProjectIcon(id, formData)
        .then(() => {
          let projects = this.getProjects

          projects.forEach(project => {
            if (project.id === this.getFormData.id) {
              project.icon = icon
            }
          })

          this.$store.commit('projects/setProjects', projects)
        })
        .catch(error => {
          this.handleError(error.response)
        })

      await this.$store.dispatch('projects/findOne', this.getFormData.id)

      this.$store.commit('projects/setLoadingUpdate', false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.icons {
  display: flex;
  flex-wrap: wrap;
}

.icons .icon {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  background-color: $bg-300;
  border-radius: 0.368rem;
  cursor: pointer;
}

.selected {
  border: 2px solid $accent-300;
}

.dark-layout .card {
  box-shadow: none;
}

.icon-wrapper .feather {
  height: 24px;
  width: 24px;
}

@media (max-width: 992px) {
  .icons .icon {
    width: 30px;
    height: 30px;
  }

  .icon-wrapper .feather {
    height: 18px;
    width: 18px;
  }
}
</style>
