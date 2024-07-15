<template>

  <div class="content-wrapper">
    <page-header
      screen-name="Ver Projetos"
      :link-items="linkItems"
    />
    <div
      v-if="getLoading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <b-row
      v-if="!getLoading"
    >
      <b-col
        cols="12"
        class="mt-2 mb-2"
      >
        <b-link
          class="show-form"
          @click="handleShowInsertForm()"
        >
          <feather-icon
            size="18"
            icon="PlusIcon"
          />
          Adicionar Novo
        </b-link>
      </b-col>

      <b-col
        v-for="(project, index) in getProjects"
        :key="index"
        class="mb-2"
        lg="3"
        md="4"
        sm="12"
      >
        <Project
          :project-info="project"
        />
      </b-col>
    </b-row>

    <b-modal
      v-model="$store.state.projects.showModalFormInsert"
      centered
      hide-footer
      size="md"
      title="Novo projeto"
    >
      <Insert />
    </b-modal>

    <b-modal
      v-model="$store.state.projects.showModalFormUpdate"
      top
      hide-footer
      size="lg"
      :title="getProjectName ? `Editar projeto - ${getProjectName}` : '-'"
    >
      <Update />
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BSpinner,
  BLink,
  BModal,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import moment from 'moment'
import Project from '@/views/pages/projects/components/Project.vue'
import Insert from '@/views/pages/projects/components/Insert.vue'
import Update from '@/views/pages/projects/components/Update.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Insert,
    Update,
    BModal,
    PageHeader,
    Project,
    BRow,
    BCol,
    BSpinner,
    BLink,
  },

  data() {
    return {
      moment,
      titlePage: '',

      linkItems: [
        {
          name: 'Projetos',
          routeName: '',
        },
        {
          name: 'Ver Projetos',
          active: true,
        },
      ],

      search: {},
    }
  },

  computed: {
    getProjects() {
      return this.$store.getters['projects/getProjects']
    },

    getLoading() {
      return this.$store.getters['projects/getLoading']
    },

    getProjectName() {
      return this.$store.getters['projects/getProjectName']
    },

    ...mapState({
      showModalFormInsert: state => state.projects.showModalFormInsert,
      showModalFormUpdate: state => state.projects.showModalFormUpdate,
    }),
  },

  watch: {
    showModalFormInsert(val) {
      if (!val) {
        this.$store.commit('projects/clearFormData')
      }
    },

    showModalFormUpdate(val) {
      if (!val) {
        this.$store.commit('projects/clearFormData')
      }
    },
  },

  mounted() {
    this.findAll()
  },

  methods: {
    async findAll() {
      await this.$store.dispatch('projects/findAll')
    },

    handleShowInsertForm() {
      this.$store.commit('projects/setShowModalFormInsert', true)
    },
  },
}
</script>

<style lang="scss">
  .action-search {
    display: flex;
  }

  .update-project {
    padding: 1.5rem;
  }

  .update-project-form {
    height: 430px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media (max-width: 400px) {
    .action-search {
      display: flex;
      flex-direction: column;

      button {
        width: 100%;
      }
    }

    .button-plus {
      width: 100%;
    }
  }

  @media (max-width: 992px) {
    .update-project-form {
      scrollbar-width: none;
    }

    .update-project-form::-webkit-scrollbar {
      display: none;
    }
  }
</style>
