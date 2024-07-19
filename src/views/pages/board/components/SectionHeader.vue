<template>
  <div
    class="kanban-title"
    :style="getSectionColorRgba"
  >
    <div
      class="kanban-title-content"
      :style="getSectionColorHexadecimal"
    >
      <feather-icon
        :icon="getSection.icon.name"
        size="18"
      />
      <h4>{{ getSection.name }}</h4>
    </div>

    <div class="settings">
      <b-badge
        v-if="getSection.cards > 0"
        pill
        variant="primary"
        class="custom-pill"
        :style="{ backgroundColor: getSection.color.hexadecimal }"
      >
        {{ getSection.cards }}
      </b-badge>

      <b-dropdown
        variant="link"
        no-caret
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <feather-icon
            icon="ChevronDownIcon"
            size="17"
          />
        </template>
        <b-dropdown-item
          @click="handleOpenModalUpdateSection"
        >
          <feather-icon
            icon="Edit2Icon"
            size="18"
          />

          Editar seção
        </b-dropdown-item>

        <b-dropdown-item @click="handleOpenModalRemoveSection">
          <feather-icon
            icon="Trash2Icon"
            size="18"
          />

          Excluir seção
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { BDropdown, BDropdownItem, BBadge } from 'bootstrap-vue'
import { confirmAction } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'
import { removeSection } from '@/views/pages/sections/api'

export default {
  components: {
    BDropdown,
    BDropdownItem,
    BBadge,
  },
  props: {
    section: {
      type: Object,
      default: null,
    },
  },

  computed: {
    getSection() {
      const sectionAux = {
        id: '',
        name: '',
        sectionOrder: '',
        project: {
          id: '',
          name: '',
        },
        icon: {
          id: '',
          name: '',
        },
        color: {
          id: '',
          name: '',
          hexadecimal: '',
          rgb: '',
          rgba: '',
        },
        cards: [],
      }

      if (this.section) {
        sectionAux.id = this.section.id
        sectionAux.name = this.section.name
        sectionAux.sectionOrder = this.section.section_order
        sectionAux.project = this.section.project
        sectionAux.icon = this.section.icon
        sectionAux.color = this.section.color
        sectionAux.cards = this.section.cards
      }

      return sectionAux
    },

    getSectionColorRgba() {
      return { backgroundColor: this.getSection.color.rgba }
    },

    getSectionColorHexadecimal() {
      return { backgroundColor: this.getSection.color.hexadecimal }
    },

    getSectionFormData() {
      return this.$store.getters['board/getSectionFormData']
    },

    getChooseProjectInNavbar() {
      return this.$store.getters['navbar/getChooseProjectInNavbar']
    },
  },

  methods: {
    async handleOpenModalUpdateSection() {
      this.$store.commit('board/setFormMode', 'update')

      this.$store.commit('board/setShowSectionModalForm', true)

      await this.$store.dispatch('board/findOne', this.getSection.id)
    },

    handleOpenModalRemoveSection() {
      confirmAction(messages.confirmDelete)
        .then(() => {
          this.handleRemoveItem()
        })
        .catch()
    },

    async handleRemoveItem() {
      this.$store.commit('board/setLoadingBoardPage', true)

      await removeSection(this.getSection.id)
        .then(response => {
          if (response.status === 204) {
            this.$store.dispatch(
              'board/findAllSectionsAndClearForm',
              { projectUniqueName: this.getChooseProjectInNavbar.uniqueName },
            )

            toastSuccess(messages.successDelete)
          }
        })
        .catch(error => {
          const errors = error.response.status === 400 || error.response.status === 404

          if (errors) {
            return toastWarning(error.response.data.error)
          }

          return toastWarning(messages.impossible)
        })

      this.$store.commit('board/setLoadingBoardPage', false)
    },
  },
}
</script>
