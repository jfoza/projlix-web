<template>
  <div class="d-flex flex-row justify-content-between">
    <span class="text-placeholder-color mb-0 ">
      Mostrando {{ getPaginationData.fromLine }} a {{ getPaginationData.toLine }} de {{ getPaginationData.totalLines }} resultados
    </span>
    <b-pagination
        id="pagination"
        v-model="getPaginationData.currentPage"
        :total-rows="getPaginationData.totalLines"
        :per-page="getPaginationData.defaultSize"
        first-number
        last-number
        align="right"
        prev-class="prev-item"
        next-class="next-item"
        class="mt-1 mb-0"
        hide-goto-end-buttons
        hide-ellipsis
        @page-click="handlePage"
    >
      <template #prev-text>
        <feather-icon
            icon="ChevronLeftIcon"
            size="18"
        />
      </template>
      <template #next-text>
        <feather-icon
            icon="ChevronRightIcon"
            size="18"
        />
      </template>
    </b-pagination>
  </div>
</template>

<script>
import { BPagination } from 'bootstrap-vue'

export default {

  components: {
    BPagination,
  },
  props: {
    paginationData: {
      required: true,
      type: Object,
      default: () => ({
        currentPage: 0,
        totalLines: 0,
        fromLine: 0,
        toLine: 0,
        defaultSize: 30,
      }),
    },
  },

  computed: {
    getPaginationData() {
      return {
        currentPage: this.paginationData.currentPage,
        totalLines: this.paginationData.totalLines,
        fromLine: this.paginationData.fromLine,
        toLine: this.paginationData.toLine,
        defaultSize: this.paginationData.defaultSize,
      }
    },
  },

  methods: {
    handlePage(event, page) {
      this.$emit('page-cliked', page)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.page-item.active .page-link {
  background-color: $bg-100 !important;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  width: 35px;
  height: 35px;
}

.page-item.next-item .page-link:hover, .page-item.prev-item .page-link:hover {
  background-color: $bg-100 !important;
  color: #fff !important;
}

.dark-layout .pagination:not([class*=pagination-]) .page-item .page-link {
  background-color: $bg-100 !important;
}
</style>
