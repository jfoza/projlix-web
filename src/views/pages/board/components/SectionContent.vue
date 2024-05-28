<template>
  <div
    class="kanban-column"
  >
    <div
      v-if="getSection.cards.length === 0"
      class="cards-no-content"
    >
      <feather-icon
        icon="CoffeeIcon"
        size="64"
        class="mb-2"
      />
      <h4>Nenhuma tarefa</h4>
    </div>

    <draggable
      v-if="getSection.cards.length > 0"
      v-model="getSection.cards"
      :group="dragGroup"
      class="draggable-list"
      :animation="200"
      @end="onEndTaskDrag($event, getSection)"
    >
      <div
        v-for="card in getSection.cards"
        :key="card.id"
        class="kanban-card"
      >
        {{ card.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },

  props: {
    section: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      dragGroup: 'tasks',
    }
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
        cards: [],
      }

      if (this.section) {
        sectionAux.id = this.section.id
        sectionAux.name = this.section.name
        sectionAux.sectionOrder = this.section.section_order
        sectionAux.project = this.section.project
        sectionAux.cards = this.section.cards
      }

      return sectionAux
    },
  },

  methods: {
    async onEndTaskDrag(event, column) {
      // Lógica para tratar o fim do arrasto de tarefas
    },
  },
}
</script>
