<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Usuários"
      :link-items="linkItems"
    />

    <div class="card">
      <section class="p-2">
        <validation-observer ref="formFilters">
          <b-form>
            <b-row class="mb-2">
              <b-col cols="12">
                <h3>Lista de Usuários</h3>
                <p>
                  Para realizar uma busca, selecione o(s) filtros necessário(s) e clique no botão buscar:
                </p>
              </b-col>
            </b-row>

            <b-row class="align-items-center">
              <b-col
                sm="6"
                lg="4"
              >
                <b-form-group
                  label="Nome"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nome"
                  >
                    <b-form-input
                      id="name"
                      v-model="search.name"
                      placeholder="Nome do Usuário"
                      autocomplete="off"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                sm="6"
                lg="4"
              >
                <b-form-group
                  label="E-mail"
                  label-for="email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="E-mail"
                    rules="email"
                  >
                    <b-form-input
                      id="email"
                      v-model="search.email"
                      placeholder="E-mail do usuário"
                      autocomplete="off"
                      type="email"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                sm="12"
                lg="4"
                class="actions-area"
              >
                <div class="action-search">
                  <button
                    type="button"
                    class="btn button-form button-config mr-2"
                    @click.prevent="handleSubmitFormFilters"
                  >
                    <feather-icon
                      icon="SearchIcon"
                    />
                    Pesquisar
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-form button-config"
                    @click="clearFilters"
                  >
                    <feather-icon
                      icon="XIcon"
                    />
                    Limpar
                  </button>
                </div>
              </b-col>
            </b-row>

            <b-row class="mt-3 mb-1">
              <b-col>
                <b-link
                  type="button"
                  class="btn button-form button-plus"
                  :to="{ name: 'admin-users-insert' }"
                >
                  <feather-icon
                    icon="PlusIcon"
                  />
                  Adicionar novo usuário
                </b-link>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
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

              <template #cell(email)="row">
                <span>{{ row.value }}</span>
              </template>

              <template #cell(profile)="row">
                <span>{{ row.item.profile[0].description }}</span>
              </template>

              <template #cell(active)="row">
                <status-field
                  :status="row.value"
                />
              </template>

              <template #cell(created_at)="row">
                <span>{{ moment(row.value).format("DD/MM/YYYY HH:mm") }}</span>
              </template>

              <template #cell(actions)="row">
                <button-icon
                  color="#2772C0"
                  size="18"
                  feather-icon="EditIcon"
                  @action="redirectUpdatePage(row.item)"
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
  BTable,
  BSpinner,
  BAlert,
  BLink,
} from 'bootstrap-vue'
import PageHeader from '@/views/components/custom/PageHeader'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from '@validations'
import { getAdminUsers } from '@core/utils/requests/users'
import moment from 'moment'
import vSelect from 'vue-select'
import CustomPagination from '@/views/components/custom/CustomPagination'
import ButtonIcon from '@/views/components/custom/ButtonIcon'
import StatusField from '@/views/components/custom/StatusField'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    PageHeader,
    vSelect,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BTable,
    BSpinner,
    BAlert,
    BLink,
    StatusField,
    CustomPagination,
    ButtonIcon,
  },

  data() {
    return {
      moment,
      required,
      email,
      titlePage: '',

      linkItems: [
        {
          name: 'Gerenciar Usuários',
          routeName: '',
        },
        {
          name: 'Ver Usuários',
          active: true,
        },
      ],

      search: {
        name: '',
        email: '',
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

      table: {
        empty: false,
        tableError: false,
        tableBusy: false,
        tableRows: [10, 25, 50, 100],
        tableOrder: '',
        tableColumnNameOrder: '',
        fields: [
          { key: 'name', label: 'NOME', sortable: true },
          { key: 'email', label: 'E-MAIL', sortable: true },
          { key: 'profile', label: 'PERFIL' },
          { key: 'active', label: 'STATUS' },
          { key: 'created_at', label: 'CRIADO EM', sortable: true },
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

  methods: {
    findAll() {
      this.table.tableError = false
      this.table.empty = false
      this.loadingTable = true

      getAdminUsers(this.setParams())
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

    handleSubmitFormFilters() {
      this.$refs.formFilters.validate()
        .then(success => {
          if (success) {
            this.findAll()
          }
        })
    },

    redirectUpdatePage(user) {
      this.$store.commit('usersModuleStore/SET_CHOOSE_USER', user)

      this.$router.replace({ name: 'admin-users' })
    },

    clearFilters() {
      this.search.name = ''
      this.search.email = ''
      this.showTable = false
    },

    handleOrderTable(context) {
      console.log(context)

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
        email: this.search.email,
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
