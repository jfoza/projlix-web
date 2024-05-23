<template>
  <div class="content-wrapper">
    <page-header
      screen-name="Ver Notas"
      :link-items="linkItems"
    />

    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <validation-observer
      v-if="!loading"
      ref="formItemsInsert"
    >
      <b-form>
        <b-row class="mb-2">
          <b-col
            cols="12"
          >
            <b-link
              v-if="getNotesInsertRule"
              class="show-form"
              @click="handleShowForm"
            >
              <feather-icon
                size="18"
                icon="PlusIcon"
              />
              Adicionar Novo
            </b-link>
          </b-col>
        </b-row>

        <b-row
          v-if="showForm"
          class="mb-3"
        >
          <b-col
            lg="8"
            sm="12"
            class="mb-2"
          >
            <div>
              <validation-provider
                #default="{ errors }"
                name="Info"
                rules="required"
              >
                <quill-editor
                  id="info"
                  v-model="formData.content"
                  :options="snowOption"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </div>
          </b-col>

          <b-col
            lg="5"
            md="6"
            sm="12"
          >
            <ButtonForm
              class-name="mr-1"
              @action="formSubmitInsert"
            >
              Adicionar
            </ButtonForm>

            <ButtonOutlineForm
              type="button"
              class="button-custom-size"
              @action="showForm=false"
            >
              Cancelar
            </ButtonOutlineForm>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <div
      v-if="!loading"
      class="notes"
    >
      <post
        v-for="(note, index) in notes"
        :key="index"
        :note-id="note.id"
        :note-content="note.content"
        @update="openModalUpdate"
        @remove="openModalDelete"
      />
    </div>

    <b-modal
      v-model="showModal"
      centered
      hide-footer
      size="lg"
      title="Editar Registro"
    >
      <validation-observer
        v-if="!loading"
        ref="formItemsUpdate"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <div class="mb-2">
              <validation-provider
                #default="{ errors }"
                name="Info"
                rules="required"
              >
                <quill-editor
                  id="info"
                  v-model="chooseNote.content"
                  :options="snowOption"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </div>

            <b-col
              cols="12"
              class="text-right p-0"
            >
              <ButtonForm
                class-name="mr-1"
                @action="formSubmitUpdate"
              >
                Salvar
              </ButtonForm>

              <ButtonOutlineForm
                @action="clear(); showModal=false"
              >
                Cancelar
              </ButtonOutlineForm>
            </b-col>
          </b-col>
        </b-row>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable import/extensions */
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
} from '@validations'
import PageHeader from '@/views/components/custom/PageHeader'
import {
  BSpinner,
  BForm,
  BRow,
  BCol,
  BLink,
  BModal,
} from 'bootstrap-vue'
import { quillEditor } from 'vue-quill-editor'
import moment from 'moment'
import { confirmAction } from '@/libs/alerts/sweetalerts'
import { messages } from '@core/utils/validations/messages'
import Post from '@/views/components/custom/Post.vue'
import {
  createNote, getAllNotes, removeNote, showNoteId, updateNote,
} from '@/views/pages/notes/api'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'
import { actions, subjects } from '@/libs/acl/rules'

export default {
  components: {
    ButtonOutlineForm,
    ButtonForm,
    ValidationProvider,
    ValidationObserver,
    PageHeader,
    Post,
    quillEditor,
    BSpinner,
    BForm,
    BRow,
    BCol,
    BLink,
    BModal,
  },

  data() {
    return {
      moment,
      titlePage: '',

      required,

      loading: true,

      showModal: false,

      showForm: false,

      formMode: 'insert',

      linkItems: [
        {
          name: 'Notas',
          routeName: '',
        },
        {
          name: 'Ver Notas',
          active: true,
        },
      ],

      notes: [],

      snowOption: {
        theme: 'snow',
      },

      formData: {
        content: '',
      },

      chooseNote: {
        id: '',
        content: '',
      },
    }
  },

  computed: {
    getNotesInsertRule() {
      return this.$can(actions.INSERT, subjects.NOTES)
    },
  },

  mounted() {
    this.findAll()
  },

  methods: {
    findAll() {
      this.loading = true

      getAllNotes()
        .then(response => {
          this.notes = response.data
        })

      this.loading = false
    },

    handleShowForm() {
      this.showForm = !this.showForm
    },

    async formSubmitInsert(redirect) {
      this.redirect = redirect

      const result = new Promise((resolve, reject) => {
        this.$refs.formItemsInsert.validate()
          .then(success => {
            if (success) {
              resolve(true)
            }
          })
          .catch(() => {
            reject()
          })
      })

      if (await result) {
        await this.handleInsert()
      }
    },

    async formSubmitUpdate(redirect) {
      this.redirect = redirect

      const result = new Promise((resolve, reject) => {
        this.$refs.formItemsUpdate.validate()
          .then(success => {
            if (success) {
              resolve(true)
            }
          })
          .catch(() => {
            reject()
          })
      })

      if (await result) {
        await this.handleUpdate()
      }
    },

    async openModalUpdate(noteId) {
      this.loading = true

      await showNoteId(noteId)
        .then(response => {
          const {
            id,
            content,
          } = response.data

          this.chooseNote = {
            id,
            content,
          }
        })
        .catch(() => {
          toastWarning(messages.impossible)
        })

      this.loading = false

      this.showModal = true
    },

    openModalDelete(id) {
      confirmAction(messages.confirmDelete)
        .then(() => {
          this.handleRemoveItem(id)
        })
    },

    async handleInsert() {
      this.loading = true

      const formData = { content: this.formData.content }

      await createNote(formData)
        .then(response => {
          if (response.status === 200) {
            this.clear()
            this.findAll()
            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.loading = false
    },

    async handleUpdate() {
      this.loading = true

      await updateNote(this.chooseNote.id, { content: this.chooseNote.content })
        .then(response => {
          if (response.status === 200) {
            this.showModal = false
            toastSuccess(messages.successSave)
            this.findAll()
            this.clear()
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.loading = false
    },

    async handleRemoveItem(id) {
      this.loadingTable = true

      await removeNote(id)
        .then(response => {
          if (response.status === 204) {
            toastSuccess(messages.successDelete)
            this.findAll()
          }
        })
        .catch(error => {
          const errors = error.response.status === 400 || error.response.status === 404

          if (errors) {
            return toastWarning(error.response.data.error)
          }

          return toastWarning(messages.impossible)
        })

      this.loadingTable = false
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    clear() {
      this.formData = {
        content: '',
      }

      this.formData = {
        id: '',
        content: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/vue/libs/quill.scss';

  .action-search {
    display: flex;
  }

  .notes {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .show-form {
    font-weight: 700;
  }

  @media (max-width: 400px) {
    .button-custom-size {
      width: 100%;
      margin-bottom: 1rem;
    }

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
