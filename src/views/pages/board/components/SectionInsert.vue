<template>
  <div class="m-section-insert">
    <section
      class="kanban-title title-insert"
    >
      <div
        class="kanban-title-content"
      >
        <button
          type="button"
          class="btn btn-custom-clear"
          @click="handleOpenModalInsertSection"
        >
          <feather-icon
            icon="PlusIcon"
            size="18"
          />

          <span>Inserir Seção</span>
        </button>
      </div>
    </section>

    <section
      class="kanban-column"
    >
      <div class="add-members-area">
        <div class="avatars-area">
          <img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar.src"
            alt="Avatar 1"
          >
        </div>

        <h6>Adicionar membros</h6>

        <p>
          Melhore sua produtividade e colabore com colegas e amigos.
        </p>

        <ButtonForm>
          Adicionar
        </ButtonForm>
      </div>
    </section>
  </div>
</template>

<script>

import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import avatar1 from '@/assets/images/custom/avatar/avatar-1.png'
import avatar2 from '@/assets/images/custom/avatar/avatar-2.png'
import avatar3 from '@/assets/images/custom/avatar/avatar-3.png'

export default {
  components: { ButtonForm },

  data() {
    return {
      avatars: [
        { src: avatar2 },
        { src: avatar1 },
        { src: avatar3 },
      ],
    }
  },

  methods: {
    handleOpenModalInsertSection() {
      this.$store.commit('board/setFormMode', 'insert')

      this.$store.commit('board/setShowSectionModalForm', true)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables/variables';

.btn-custom-clear {
  display: flex;
  align-items: center;
  color: $text-color;
  background-color: transparent;
  padding: 0;
  border: none;
  transition: .4s color;
}

.btn-custom-clear:hover {
  color: $accent-300;
}

.btn-custom-clear span {
  margin: 0 0 0 7px;
  font-size: 16px;
}

.add-members-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.add-members-area p {
  text-align: center;
}

.avatars-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.avatars-area img {
  max-width: 64px
}
</style>
