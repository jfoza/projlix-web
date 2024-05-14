<template>
  <div class="d-flex flex-row justify-content-between">
    <span class="text-placeholder-color mb-0 ">
      Mostrando {{ paginacao.fromLine }} a {{ paginacao.toLine }} de {{ paginacao.totalLines }} resultados
    </span>
    <b-pagination
      id="pagination"
      v-model="paginacao.currentPage"
      :total-rows="paginacao.totalLines"
      :per-page="paginacao.defaultSize"
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
    paginacao: {
      required: true,
    },
  },

  methods: {
    handlePage(event, page) {
      this.$emit('page-cliked', page)
    },
  },
}
</script>

<style>
.page-item.active .page-link {
  background-color: #2772C0;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  width: 35px;
  height: 35px;
}

.page-item.next-item .page-link:hover, .page-item.prev-item .page-link:hover {
  background-color: #2772C0 !important;
  color: #fff !important;
}
</style>
