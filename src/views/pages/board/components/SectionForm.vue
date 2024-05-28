<template>
  <validation-observer
    ref="formItems"
  >
    <div
      v-if="loading"
      class="spinner-area"
    >
      <b-spinner
        variant="custom"
        label="Loading..."
      />
    </div>

    <b-form
      v-if="!loading"
    >
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <b-form-group
            label="Nome"
            label-for="name"
          >
            <validation-provider
              #default="{ errors }"
              name="Nome"
              rules="required"
            >
              <b-form-input
                id="name"
                v-model="getFormData.name"
                :state="errors.length > 0 ? false : null"
                autocomplete="off"
                placeholder="Nome da seção"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          class="mb-2"
        >
          <b-form-group
            label="Ícone de seção"
            label-for="icon"
          >
            <FeatherIcons
              ref="featherIcons"
              height="198px"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Cor de seção"
            label-for="color"
          >
            <Colors
              ref="colors"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          class="mt-3 text-right"
        >
          <ButtonOutlineForm
            class-name="mr-1"
            @action="cancel"
          >
            Cancelar
          </ButtonOutlineForm>

          <ButtonForm
            @action="formSubmit"
          >
            Salvar
          </ButtonForm>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
/* eslint-disable import/extensions */
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BSpinner,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
} from '@validations'
import { messages } from '@core/utils/validations/messages'
import { updateProject } from '@/views/pages/projects/api'
import ButtonForm from '@/views/components/custom/buttons/ButtonForm.vue'
import ButtonOutlineForm from '@/views/components/custom/buttons/ButtonOutlineForm.vue'
import { toastSuccess, toastWarning } from '@/libs/alerts/toast'
import FeatherIcons from '@/views/pages/icons/components/FeatherIcons.vue'
import Colors from '@/views/pages/colors/components/Colors.vue'
import { createSection } from '@/views/pages/sections/api'

export default {
  components: {
    Colors,
    FeatherIcons,
    ButtonOutlineForm,
    ButtonForm,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
  },

  data() {
    return {
      required,

      loading: false,
    }
  },

  computed: {
    getFormData() {
      return this.$store.getters['board/getSectionFormData']
    },

    getChooseProjectInNavbar() {
      return this.$store.getters['projects/getChooseProjectInNavbar']
    },

    getMode() {
      return this.$store.getters['board/getFormMode']
    },
  },

  mounted() {

  },

  methods: {
    async formSubmit() {
      const result = new Promise((resolve, reject) => {
        this.$refs.formItems.validate()
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
        await this.core()
      }
    },

    async core() {
      if (this.getMode === 'insert') {
        await this.handleCreate()
      }

      if (this.getMode === 'update') {
        await this.handleUpdate()
      }
    },

    async handleCreate() {
      this.$store.commit('board/setLoadingBoardPage', true)

      const formData = {
        name: this.getFormData.name,
        projectId: this.getChooseProjectInNavbar.id,
        iconId: this.$refs.featherIcons.selectedIcon.id,
        colorId: this.$refs.colors.selectedColor.id,
      }

      await createSection(formData)
        .then(response => {
          if (response.status === 201) {
            this.handleFindAllSectionsAndClearForm()
            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('board/setLoadingBoardPage', false)
    },

    async handleUpdate() {
      this.$store.commit('board/setLoadingBoardPage', true)

      const { id } = this.getFormData

      const formData = {
        name: this.getFormData.name,
        description: this.getFormData.description,
      }

      await updateProject(id, formData)
        .then(response => {
          if (response.status === 200) {
            this.handleFindAllSectionsAndClearForm()
            toastSuccess(messages.successSave)
          }
        })
        .catch(error => {
          this.handleError(error.response)
        })

      this.$store.commit('board/setLoadingBoardPage', false)
    },

    handleError(response) {
      const errors = response.status === 400 || response.status === 404

      if (errors) {
        return toastWarning(response.data.error)
      }

      return toastWarning(messages.impossible)
    },

    cancel() {
      this.$store.commit('board/clear')

      this.$store.commit('board/setShowSectionModalForm', false)
    },

    async handleFindAllSectionsAndClearForm() {
      this.$store.commit('board/clear')

      this.$store.commit('board/setShowSectionModalForm', false)

      await this.$store.dispatch(
        'board/findAll',
        { projectUniqueName: this.getChooseProjectInNavbar.uniqueName },
      )
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
