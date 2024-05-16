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
          @click="handleShowForm()"
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
      v-model="getShowModalForm"
      centered
      hide-footer
      size="md"
      :hide-header-close="true"
      :title="getMode === 'update' ? 'Editar projeto' : 'Novo projeto'"
    >
      <Form />
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BSpinner,
  BLink, BModal,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader.vue'
import moment from 'moment'
import Project from '@/views/pages/projects/components/Project.vue'
import Form from '@/views/pages/projects/components/Form.vue'

export default {
  components: {
    Form,
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

    getMode() {
      return this.$store.getters['projects/getMode']
    },

    getShowModalForm() {
      return this.$store.getters['projects/getShowModalForm']
    },

    getLoading() {
      return this.$store.getters['projects/getLoading']
    },
  },

  mounted() {
    this.findAll()
  },

  methods: {
    async findAll() {
      await this.$store.dispatch('projects/findAll')
    },

    handleShowForm() {
      this.$store.commit('projects/setMode', 'insert')

      this.$store.commit('projects/setShowModalForm', true)
    },
  },
}
</script>

<style lang="scss" scoped>
  .action-search {
    display: flex;
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
</style>
