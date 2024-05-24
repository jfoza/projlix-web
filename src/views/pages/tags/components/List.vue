<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Tags"
      :link-items="linkItems"
    />

    <b-overlay
      :show="loading"
      variant="transparent"
    >
      <div class="card">
        <section class="p-2">
          <b-form>
            <b-row class="mb-2">
              <b-col cols="12">
                <h3>Lista de Tags</h3>
                <p>
                  Para realizar uma busca, selecione o(s) filtros necessário(s) e clique no botão buscar:
                </p>
              </b-col>
            </b-row>

            <b-row class="align-items-center">
              <b-col
                sm="6"
                lg="4"
                xl="3"
              >
                <b-form-group
                  label="Nome"
                  label-for="name"
                >

                  <b-form-input
                    id="name"
                    v-model="search.name"
                    placeholder="Nome"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>

              <b-col
                sm="12"
                lg="4"
                class="actions-area"
              >
                <div class="action-search">
                  <ButtonForm
                    class-name="button-config mr-2"
                    @action="findAll"
                  >
                    <feather-icon
                      icon="SearchIcon"
                    />
                    Pesquisar
                  </ButtonForm>

                  <ButtonOutlineForm
                    class-name="button-config"
                    @action="clearFilters(); findAll()"
                  >
                    <feather-icon
                      icon="XIcon"
                    />
                    Limpar
                  </ButtonOutlineForm>
                </div>
              </b-col>
            </b-row>

            <b-row class="mt-3 mb-1">
              <b-col>
                <ButtonForm
                  class-name="button-plus"
                  @action="$router.replace({ name: 'tags-insert' })"
                >
                  <feather-icon
                    icon="PlusIcon"
                  />
                  Adicionar nova tag
                </ButtonForm>
              </b-col>
            </b-row>
          </b-form>
        </section>

        <section v-if="loadingTable">
          <div class="spinner-area">
            <b-spinner
              variant="custom"
              label="Loading..."
            />
          </div>
        </section>

        <section v-if="!loadingTable">
          <b-row>
            <b-col
              md="12"
              lg="6"
            >
              <h1 class="px-2">
                {{ titlePage }}
              </h1>
            </b-col>
          </b-row>

          <b-row class="my-2">
            <b-col
              class="px-3"
              sm="6"
            >
              <div
                v-if="showTable"
                class="d-flex justify-center-center align-items-center"
              >
                <span class="mr-50">Mostrar</span>
                <v-select
                  id="orders"
                  v-model="paginationData.defaultSize"
                  :options="table.tableRows"
                  :clearable="false"
                  @input="updateQtdView($event)"
                >
                  <span slot="no-options">Nenhuma opção selecionável.</span>
                </v-select>
              </div>
            </b-col>

            <b-col cols="12">
              <b-alert
                variant="primary"
                :show="table.empty"
                class="mx-2 mt-5"
              >
                <div class="alert-body d-flex justify-content-center">
                  <span class="text-primary">
                    <strong
                      class="text-primary"
                    >Nenhum registro encontrado.</strong>
                  </span>
                </div>
              </b-alert>

              <b-alert
                variant="primary"
                :show="table.tableError"
                class="mx-2 mt-5"
              >
                <div class="alert-body d-flex justify-content-center">
                  <span class="text-primary">
                    <strong
                      class="text-primary"
                    >Sistema de busca indisponível no momento.</strong>
                  </span>
                </div>
              </b-alert>
            </b-col>

            <b-col
              v-if="showTable"
              cols="12"
              class="my-2"
            >
              <b-table
                responsive
                sticky-header="380px"
                :busy.sync="table.tableBusy"
                :no-local-sorting="true"
                :fields="table.fields"
                :items="table.items"
                @context-changed="handleOrderTable"
              >
                <template #cell(name)="row">
                  <span>{{ row.value }}</span>
                </template>

                <template #cell(created_at)="row">
                  <span>{{ moment(row.value).format("DD/MM/YYYY HH:mm") }}</span>
                </template>

                <template #cell(active)="row">
                  <b-form-checkbox
                    :disabled="isDisabledCheckbox"
                    :checked="row.value"
                    class="custom-control-success"
                    name="check-button"
                    switch
                    @change="handleConfirmUpdateStatus(row.item)"
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    <span class="switch-icon-right" />
                  </b-form-checkbox>
                </template>

                <template #cell(actions)="row">
                  <button-icon
                    color="#2772C0"
                    size="18"
                    feather-icon="EditIcon"
                    @action="redirectUpdatePage(row.item)"
                  />

                  <button-icon
                    color="#2772C0"
                    size="18"
                    feather-icon="Trash2Icon"
                    @action="handleOpenModalConfirmDelete(row.item)"
                  />
                </template>
              </b-table>
            </b-col>

            <b-col
              v-if="showTable"
              class="px-3"
              sm="12"
            >
              <CustomPagination
                :pagination-data="paginationData"
                @page-cliked="updateCurrentPage"
              />
            </b-col>
          </b-row>
        </section>
      </div>
    </b-overlay>
  </div>
</template>

<script>
/* eslint-disable import/extensions,import/no-extraneous-dependencies */
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BTable,
  BSpinner,
  BAlert, BOverlay,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/buttons/ButtonIcon'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'
import { statusForm } from '@core/utils/statusForm'
import { messages } from '@core/utils/validations/messages'
import { confirmAction, warningMessageUpdateStatus } from '@/libs/alerts/sweetalerts'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'
import { getAllTags, removeTag, updateStatusTag } from '@/views/pages/tags/api'
import { removeProject } from '@/views/pages/projects/api/projects'

export default {
  components: {
    BOverlay,
    ButtonOutlineForm,
    ButtonForm,
    PageHeader,
    vSelect,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BTable,
    BSpinner,
    BAlert,
    CustomPagination,
    ButtonIcon,
  },

  data() {
    return {
      moment,
      titlePage: '',

      linkItems: [
        {
          name: 'Gerenciar Tags',
          routeName: '',
        },
        {
          name: 'Ver Tags',
          active: true,
        },
      ],

      isDisabledCheckbox: false,

      search: {
        name: '',
      },

      loadingTable: false,
      showTable: false,

      paginationData: {
        currentPage: 0,
        totalLines: 0,
        fromLine: 0,
        toLine: 0,
        defaultSize: 10,
      },

      statusForm,

      loading: false,

      table: {
        empty: false,
        tableError: false,
        tableBusy: false,
        tableRows: [10, 25, 50, 100],
        tableOrder: '',
        tableColumnNameOrder: '',
        fields: [
          { key: 'name', label: 'NOME', sortable: true },
          { key: 'created_at', label: 'CRIADO EM', sortable: true },
          { key: 'active', label: 'STATUS', sortable: true },
          {
            key: 'actions',
            label: 'AÇÕES',
            class: 'width-custom-column text-center',
          },
        ],
        items: [],
      },
    }
  },

  mounted() {
    this.findAll()
  },

  methods: {
    findAll() {
      this.table.tableError = false
      this.table.empty = false
      this.loadingTable = true

      getAllTags(this.setParams())
        .then(response => {
          if (response.status === 200) {
            if (response.data.data.length > 0) {
              this.showTable = true
              this.table.items = response.data.data
              this.table.tableBusy = false
              this.handlePagination(response.data)
              return
            }

            this.table.empty = true
            this.showTable = false
          }
        })
        .catch(() => {
          this.table.tableError = true
          this.showTable = false
        })

      this.loadingTable = false
    },

    handleConfirmUpdateStatus({ id, active }) {
      const { title1, title2, value } = messages.confirmUpdateTagStatus

      warningMessageUpdateStatus(active ? title1 : title2, value)
        .then(() => {
          this.handleUpdateTagStatus(id)
        })
        .catch(() => {
          this.table.items = []
          this.findAll()
        })
    },

    handleOpenModalConfirmDelete({ id }) {
      confirmAction(messages.confirmDelete)
        .then(() => {
          this.handleRemoveItem(id)
        })
        .catch()
    },

    async handleRemoveItem(id) {
      this.loading = true

      await removeTag(id)
        .then(response => {
          if (response.status === 204) {
            this.findAll()

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

      this.loading = false
    },

    async handleUpdateTagStatus(id) {
      this.isDisabledCheckbox = true

      await updateStatusTag(id)
        .then(response => {
          if (response.status === 200) {
            this.table.items = []
            this.findAll()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.isDisabledCheckbox = false
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    redirectUpdatePage(tag) {
      this.$store.commit('tags/setChooseTag', tag)

      this.$router.replace({ name: 'tags-update' })
    },

    clearFilters() {
      this.search = {
        name: '',
      }
    },

    handleOrderTable(context) {
      this.table.tableColumnNameOrder = context.sortBy
      this.table.tableOrder = context.sortDesc ? 'desc' : 'asc'

      this.findAll()
    },

    setParams() {
      return {
        columnName: this.table.tableColumnNameOrder,
        columnOrder: this.table.tableOrder,
        perPage: this.paginationData.defaultSize,
        page: this.paginationData.currentPage,
        name: this.search.name,
      }
    },

    handlePagination(data) {
      this.paginationData.fromLine = data.from
      this.paginationData.toLine = data.to
      this.paginationData.totalLines = data.total
      this.paginationData.currentPage = data.current_page
    },

    updateQtdView(event) {
      if (!event) {
        this.paginationData.defaultSize = 10
      }

      this.paginationData.currentPage = 1
      this.findAll()
    },

    updateCurrentPage(page) {
      this.paginationData.currentPage = page
      this.findAll()
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
