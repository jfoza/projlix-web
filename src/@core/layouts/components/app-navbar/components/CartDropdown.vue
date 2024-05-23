<template>
  <b-nav-item-dropdown
    class="dropdown-cart mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="getCountItems"
        class="text-body"
        icon="ShoppingCartIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Meu carrinho
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ getCountItems }} Produto(s)
        </b-badge>
      </div>
    </li>

    <!-- Cart Items -->
    <vue-perfect-scrollbar
      v-if="getItems.length"
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <b-media
        v-for="item in getItems"
        :key="item.name"
      >
        <template #aside>
          <b-img
            :src="item.productImg"
            :alt="item.productName"
            rounded
            width="62px"
          />
        </template>
        <feather-icon
          icon="XIcon"
          class="cart-item-remove cursor-pointer"
          @click.stop="removeItemFromCart(item.productId)"
        />
        <div class="media-heading">
          <h6 class="cart-item-title">
            <b-link class="text-body">
              {{ item.productName }}
            </b-link>
          </h6>
        </div>

        <div class="cart-item-qty ml-1">
          <b-form-spinbutton
            v-model="item.productQtd"
            min="1"
            size="sm"
          />
        </div>

        <h5 class="cart-item-price">
          {{ moneyFormatBRL((item.productValue * item.productQtd)) }}
        </h5>
      </b-media>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li
      v-if="getItems.length"
      class="dropdown-menu-footer"
    >
      <div class="d-flex justify-content-between mb-1">
        <h6 class="font-weight-bolder mb-0">
          Total:
        </h6>
        <h6 class="text-primary font-weight-bolder mb-0">
          {{ moneyFormatBRL(getTotalAmount) }}
        </h6>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="accent-300"
        block
        :to="{ name: '' }"
      >
        Ir para o Checkout
      </b-button>
    </li>

    <p
      v-if="!getItems.length"
      class="m-0 p-1 text-center"
    >
      Seu carrinho está vazio!
    </p>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BImg, BFormSpinbutton, BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { moneyFormatBRL } from '@core/utils/utils'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BImg,
    BFormSpinbutton,
    VuePerfectScrollbar,
    BButton,
  },

  directives: {
    Ripple,
  },

  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      },

    }
  },

  computed: {
    getItems() {
      return this.$store.getters['storeModuleCheckout/getProducts']
    },

    getCountItems() {
      return this.$store.getters['storeModuleCheckout/getCountProducts']
    },

    getTotalAmount() {
      return this.$store.getters['storeModuleCheckout/getSubTotal']
    },
  },

  methods: {
    moneyFormatBRL,

    removeItemFromCart(productId) {
      this.$store.commit('storeModuleCheckout/removeProduct', productId)
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown-cart {
  .media {
    .media-aside {
      align-items: center;
    }
  }
}
</style>
