<template>
  <div class="post">
    <div />
    <div
      class="mt-1 mb-1"
      v-html="getContent"
    />

    <div>
      <button
        v-if="getNotesUpdateRule"
        type="button"
        class="btn p-0 btn-post-edit"
        @click="update"
      >
        <feather-icon
          size="18"
          icon="EditIcon"
        />
      </button>

      <button
        v-if="getNotesDeleteRule"
        type="button"
        class="btn p-0 btn-post-remove"
        @click="remove"
      >
        <feather-icon
          size="18"
          icon="Trash2Icon"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { actions, subjects } from '@/libs/acl/rules'

export default {
  props: {
    noteId: {
      type: String,
      default: '',
    },
    noteContent: {
      type: String,
      default: '',
    },
  },

  computed: {
    getId() {
      return this.noteId
    },

    getContent() {
      return this.noteContent
    },

    getNotesUpdateRule() {
      return this.$can(actions.UPDATE, subjects.NOTES)
    },

    getNotesDeleteRule() {
      return this.$can(actions.DELETE, subjects.NOTES)
    },
  },

  methods: {
    update() {
      this.$emit('update', this.getId)
    },

    remove() {
      this.$emit('remove', this.getId)
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables/variables';

  .post {
    background: $bg-200;
    border-radius: 0.428rem;
    box-shadow: 0 4px 24px 0 rgba(34,41,47,.1);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 1.5rem;
    margin-right: 1.5rem;
    padding: 1rem 1.2rem;
    transition: all .3s cubic-bezier(.23,1,.32,1),background 0s,color 0s,border 0s;
    min-height: 132px;
  }

  .btn-post-edit, .btn-post-remove {
    color: #fff;
  }

  .btn-post-edit {
    margin-right: .4rem;
  }
</style>
