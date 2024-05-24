<template>
  <div
    class="content-wrapper"
  >
    <b-overlay
      :show="loading"
      variant="transparent"
    >
      <page-header
        screen-name="Editar Tag"
        :link-items="linkItems"
      />

      <div class="card p-card-form">
        <Form
          :mode="formActions.updateAction"
          @setLoading="setLoading"
        />
      </div>
    </b-overlay>
  </div>
</template>

<script>

import PageHeader from '@/views/components/custom/PageHeader.vue'
import { warningMessage } from '@/libs/alerts/sweetalerts'
import { formActions } from '@core/utils/formActions'
import { messages } from '@core/utils/validations/messages'
import { BOverlay } from 'bootstrap-vue'
import { getTagId } from '@/views/pages/tags/api'
import Form from './Form.vue'

export default {
  components: {
    BOverlay,
    PageHeader,
    Form,
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Gerenciar Tags',
          routeName: 'tags',
        },
        {
          name: 'Editar Tag',
          active: true,
        },
        {
          name: '...',
          active: true,
        },
      ],

      loading: true,

      formActions,
    }
  },

  computed: {
    getChooseItemStore() {
      return this.$store.getters['tags/getChooseTag']
    },
  },

  created() {
    if (!this.getChooseItemStore.id) {
      this.redirectToMainPage()

      return false
    }

    return this.handleGetChooseItemStore()
  },

  methods: {
    async handleGetChooseItemStore() {
      this.setLoading(true)

      await getTagId(this.getChooseItemStore.id)
        .then(response => {
          const {
            id,
            name,
          } = response.data

          this.$store.commit('tags/setFormData', {
            id,
            name,
          })

          this.linkItems[2].name = this.$store.getters['tags/getFormData'].name
        })
        .catch(() => {
          warningMessage(messages.impossible)
        })

      this.setLoading(false)
    },

    redirectToMainPage() {
      this.$store.commit('tags/clearFormData')
      this.$store.commit('tags/clearChooseTag')
      this.$router.replace({ name: 'tags' })
    },

    setLoading(loading) {
      this.loading = loading
    },
  },
}
</script>
