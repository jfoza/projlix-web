<template>
  <div class="content-wrapper">
    <div v-if="viewPage">
      <b-overlay
        :show="getLoading"
        variant="transparent"
        :opacity="1"
      >
        <div class="kanban-board">
          <draggable
            v-model="$store.state.board.sections"
            :group="{ name: 'sections', pull: 'clone', put: false }"
            class="draggable-columns"
            direction="horizontal"
            :animation="200"
            item-key="section_order"
            :force-fallback="true"
            @change="onColumnChange($event)"
          >
            <div
              v-for="section in $store.state.board.sections"
              :key="section.section_order"
            >
              <SectionHeader
                :section="section"
              />

              <SectionContent
                :section="section"
              />
            </div>
          </draggable>

          <SectionInsert />
        </div>
      </b-overlay>

      <b-modal
        v-model="$store.state.board.showSectionModalForm"
        centered
        hide-footer
        size="md"
        :title="'Nova seção'"
      >
        <SectionForm />
      </b-modal>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { BModal, BOverlay } from 'bootstrap-vue'
import SectionHeader from '@/views/pages/board/components/SectionHeader.vue'
import SectionContent from '@/views/pages/board/components/SectionContent.vue'
import SectionInsert from '@/views/pages/board/components/SectionInsert.vue'
import { mapState } from 'vuex'
import SectionForm from '@/views/pages/board/components/SectionForm.vue'
import { reorderSection } from '@/views/pages/sections/api'
import { toastWarning } from '@/libs/alerts/toast'
import { messages } from '@core/utils/validations/messages'

export default {
  components: {
    SectionForm,
    BModal,
    SectionInsert,
    SectionContent,
    SectionHeader,
    BOverlay,
    draggable,
  },

  props: {
    projectUniqueName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      viewPage: false,

      dragGroup: 'tasks',

      columns: [
        {
          id: 1,
          title: 'Backlog',
          tasks: [
            { id: 1, description: 'Tarefa 1' },
            { id: 2, description: 'Tarefa 2' },
          ],
        },
        {
          id: 2,
          title: 'Em desenvolvimento',
          tasks: [],
        },
        {
          id: 3,
          title: 'Auditoria',
          tasks: [],
        },
        {
          id: 4,
          title: 'Concluídas',
          tasks: [],
        },
      ],
    }
  },

  computed: {
    getProjectUniqueName() {
      return this.projectUniqueName
    },

    getChooseProject() {
      return this.$store.getters['navbar/getChooseProjectInNavbar']
    },

    getLoading() {
      return this.$store.getters['board/getLoadingBoardPage']
    },

    ...mapState({
      showSectionModalForm: state => state.board.showSectionModalForm,
    }),
  },

  watch: {
    showSectionModalForm(val) {
      if (!val) {
        this.$store.commit('board/clear')
        this.$store.commit('icons/clearSelectedIcon')
        this.$store.commit('colors/clearSelectedColor')
      }
    },
  },

  mounted() {
    if (!this.getProjectUniqueName || this.getChooseProject.id === '') {
      this.viewPage = false

      this.redirectToMainPage()

      return false
    }

    this.viewPage = true

    this.$store.commit('verticalMenu/updateVerticalMenuCollapsed', true)

    return this.handleSectionsByProjectUniqueName()
  },

  methods: {
    async handleSectionsByProjectUniqueName() {
      await this.$store.dispatch(
        'board/findAll',
        { projectUniqueName: this.getProjectUniqueName },
      )
    },

    async onColumnChange(event) {
      this.$store.commit('board/setLoadingBoardPage', true)

      const { moved } = event

      if (moved) {
        const { element, newIndex } = moved

        const newOrder = (newIndex + 1)

        await reorderSection(element.id, { newOrder })
          .then(response => {
            if (response.status === 204) {
              this.$store.dispatch(
                'board/findAll',
                { projectUniqueName: this.getProjectUniqueName },
              )
            }
          })
          .catch(() => {
            toastWarning(messages.impossible)

            this.$store.commit('board/setLoadingBoardPage', true)
          })
      }

      this.$store.commit('board/setLoadingBoardPage', true)
    },

    redirectToMainPage() {
      this.$router.replace({ name: 'projects-list' })
    },
  },
}
</script>

<style lang="scss">
@import '@/views/pages/board/style/board.scss';
</style>
