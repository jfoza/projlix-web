<template>
  <div class="kanban-board">
    <draggable
      class="kanban-columns"
      :list="sections"
      group="sections"
      direction="horizontal"
      @end="onSectionEnd"
    >
      <div
        v-for="(section, sectionIndex) in sections"
        :key="section.id"
        class="kanban-column"
      >
        <h2>{{ section.name }}</h2>
        <draggable
          class="kanban-cards"
          :list="section.cards"
          group="cards"
          @end="onCardEnd"
        >
          <div
            v-for="(card, cardIndex) in section.cards"
            :key="card.id"
            class="kanban-card"
          >
            {{ card.name }}
          </div>
        </draggable>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  data() {
    return {
      sections: [
        {
          id: 1,
          name: 'To Do',
          cards: [
            { id: 1, name: 'Task 1' },
            { id: 2, name: 'Task 2' },
          ],
        },
        {
          id: 2,
          name: 'In Progress',
          cards: [
            { id: 3, name: 'Task 3' },
            { id: 4, name: 'Task 4' },
          ],
        },
        {
          id: 3,
          name: 'Done',
          cards: [
            { id: 5, name: 'Task 5' },
            { id: 6, name: 'Task 6' },
          ],
        },
      ],
    }
  },
  methods: {
    onSectionEnd(evt) {
      console.log('Section reordered', evt)
    },
    onCardEnd(evt) {
      console.log('Card reordered', evt)
    },
  },
}
</script>

<style scoped>
.kanban-board {
  display: flex;
  overflow-x: auto;
}

.kanban-columns {
  display: flex;
  flex-direction: row;
}

.kanban-column {
  min-width: 300px;
  margin: 0 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

.kanban-cards {
  min-height: 100px;
}

.kanban-card {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
