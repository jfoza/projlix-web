<template>
  <overlay
    :show="getLoadingUpdate"
  >
    <div class="content-wrapper update-project">
      <b-tabs
        vertical
        pills
        nav-class="nav-left"
      >
        <b-tab>
          <template #title>
            <feather-icon
              icon="InfoIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Info</span>
          </template>

          <GeneralDataForm />
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon
              icon="UsersIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Compartilhamento</span>
          </template>

          <TeamUsersForm />
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon
              icon="TagIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Tags</span>
          </template>

          <TagsForm />
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon
              icon="CircleIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Ícone</span>
          </template>

          <IconForm />
        </b-tab>
      </b-tabs>
    </div>
  </overlay>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import GeneralDataForm from '@/views/pages/projects/components/forms/GeneralDataForm.vue'
import Overlay from '@/views/components/custom/Overlay.vue'
import TagsForm from '@/views/pages/projects/components/forms/TagsForm.vue'
import IconForm from '@/views/pages/projects/components/forms/IconForm.vue'
import TeamUsersForm from '@/views/pages/projects/components/forms/TeamUsersForm.vue'

export default {
  components: {
    TeamUsersForm,
    IconForm,
    TagsForm,
    Overlay,
    GeneralDataForm,
    BTabs,
    BTab,
  },

  data() {
    return {
      loading: false,

    }
  },

  computed: {
    getLoadingUpdate() {
      return this.$store.getters['projects/getLoadingUpdate']
    },
  },

  methods: {
    async index() {
      this.loading = true

      this.loading = false
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/_variables.scss';
</style>
