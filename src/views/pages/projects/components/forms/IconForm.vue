<template>
  <div class="update-project-form ml-1">
    <label class="mb-2">Escolha o ícone do projeto.</label>

    <FeatherIcons
      :selected-icon="selectedIcon"
      @update:selectedIcon="selectIcon"
    />
  </div>
</template>

<script>
import { VBTooltip } from 'bootstrap-vue'
import { updateProjectIcon } from '@/views/pages/projects/api'
import { toastWarning } from '@/libs/alerts/toast'
import { messages } from '@core/utils/validations/messages'
import FeatherIcons from '@/views/pages/icons/components/FeatherIcons.vue'
import { mapState } from 'vuex'

export default {
  components: { FeatherIcons },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      selectedIcon: null,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['projects/getFormData']
    },

    getProjects() {
      return this.$store.getters['projects/getProjects']
    },

    ...mapState({
      getSelectedIcon: state => state.projects.formData.icon,
    }),
  },

  watch: {
    getSelectedIcon: {
      immediate: true,
      handler(newValue) {
        this.selectedIcon = newValue
      },
    },
  },

  methods: {
    async selectIcon(icon) {
      this.$store.commit('projects/setProjectIcon', icon)

      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        iconId: icon.id,
      }

      await updateProjectIcon(id, formData)
        .then(() => {
          const projects = this.getProjects

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
