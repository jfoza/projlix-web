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
              <SectionHeader :section="section" />

              <div class="kanban-column">
                <draggable
                  v-model="section.cards"
                  :group="'cards'"
                  class="draggable-list"
                  :animation="200"
                  ghost-class="ghost"
                  :empty-insert-threshold="1"
                  @change="onCardChange($event)"
                >
                  <transition-group
                    name="list"
                    tag="div"
                  >
                    <div
                      v-for="card in section.cards"
                      :key="card.id"
                      class="kanban-card"
                    >
                      {{ card.description }}
                    </div>
                    <div
                      v-if="section.cards.length === 0"
                      key="empty"
                      class="cards-no-content"
                    >
                      <feather-icon
                        icon="CoffeeIcon"
                        size="64"
                        class="mb-2"
                      />
                      <h4>Nenhuma tarefa</h4>
                    </div>
                  </transition-group>
                </draggable>
              </div>
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

    async onCardChange(event) {
      const { added, moved } = event

      if (added) {
        console.log('Added')
      }

      if (moved) {
        console.log('Moved')
      }

      return false

      if (added || moved) {
        const card = added ? added.element : moved.element

        const section = this.$store.state.board.sections.find(section => section.cards.some(item => card.id === item.id))
      }
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
