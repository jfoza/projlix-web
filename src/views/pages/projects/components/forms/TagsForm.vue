<template>
  <div class="update-project-form">
    <b-row>
      <b-col
        class="mb-2"
        cols="12"
      >
        <TagsAutoSuggest
          ref="nameAutoSuggest"
          @focus="searchEmptyError = false"
          @setTagName="handleAddProjectTag"
        />
      </b-col>

      <b-col
        v-for="(tag, index) in getTags"
        :key="index"
        xl="6"
        lg="12"
        class="mb-2"
      >
        <div
          class="project-tag"
          @mouseover="hoveredTag = index"
          @mouseleave="hoveredTag = null"
        >
          <div class="tag-info">
            <feather-icon
              icon="TagIcon"
              size="21"
              class="mr-1"
              :style="{ color: tag.color.hexadecimal }"
            />
            <span
              :style="{ color: tag.color.hexadecimal }"
            >
              {{ tag.name }}
            </span>
          </div>

          <transition name="fade">
            <ButtonIcon
              v-show="hoveredTag === index"
              feather-icon="XIcon"
              @action="handleRemoveProjectTag(tag)"
            />
          </transition>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import ButtonIcon from '@/views/components/custom/buttons/ButtonIcon.vue'
import TagsAutoSuggest from '@/views/pages/projects/components/TagsAutoSuggest.vue'
import { removeProjectTag, addProjectTag } from '@/views/pages/projects/api'
import { toastWarning } from '@/libs/alerts/toast'
import { messages } from '@core/utils/validations/messages'

export default {
  components: {
    TagsAutoSuggest,
    ButtonIcon,
    BRow,
    BCol,
  },

  data() {
    return {
      hoveredTag: null,

      searchEmptyError: false,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['projects/getFormData']
    },

    getTags() {
      return this.getFormData.tags
    },
  },

  methods: {
    async handleAddProjectTag(tag) {
      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        projectId: id,
        tagId: tag.id,
      }

      await addProjectTag(formData)
        .then(response => {
          if (response.status === 201) {
            this.clearAutoSuggest()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      await this.$store.dispatch('projects/findOne', this.getFormData.id)

      this.$store.commit('projects/setLoadingUpdate', false)
    },

    async handleRemoveProjectTag(tag) {
      this.$store.commit('projects/setLoadingUpdate', true)

      const { id } = this.getFormData

      const formData = {
        tagId: tag.id,
      }

      await removeProjectTag(id, formData)
        .then(response => {
          if (response.status === 204) {
            this.clearAutoSuggest()
          }
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
        return toastWarning(response.data.message)
      }

      return toastWarning(messages.impossible)
    },

    clearAutoSuggest() {
      this.$refs.nameAutoSuggest.chooseTag = null
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

.project-tag {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px 8px 15px;
  border-radius: 0.358rem;
  background-color: $bg-300;
}

.project-tag .tag-info {
  height: 100%;
  display: flex;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
