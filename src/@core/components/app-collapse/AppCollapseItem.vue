<template>
  <b-card
    no-body
    :class="{'open': visible}"
    :style="getStyles"
    @mouseenter="collapseOpen"
    @mouseleave="collapseClose"
  >
    <b-card-header
      :class="{'collapsed': !visible}"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="collapseItemID"
      role="tab"
      data-toggle="collapse"
      @click="updateVisible(!visible)"
    >
      <slot name="header">
        <div class="header-items">
          <div class="mr-1">
            <b-img
              v-if="imgIcon"
              :src="imgIcon"
              class="mr-1 img-fluid"
              width="25"
            />

            <span class="lead collapse-title">{{ title }}</span>
          </div>

          <span class="lead collapse-title">{{ textRight }}</span>
        </div>
      </slot>
    </b-card-header>

    <b-collapse
      :id="collapseItemID"
      v-model="visible"
      :accordion="accordion"
      role="tabpanel"
    >
      <b-card-body>
        <slot />
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCollapse, BImg,
} from 'bootstrap-vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCollapse,
    BImg,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    textRight: {
      type: String,
      default: '',
    },
    imgIcon: {
      type: String,
      default: '',
    },
    borderRadiusCard: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
      collapseItemID: '',
      openOnHover: this.$parent.hover,
    }
  },
  computed: {
    accordion() {
      return this.$parent.accordion ? `accordion-${this.$parent.collapseID}` : null
    },

    getStyles() {
      return {
        borderRadius: `${this.borderRadiusCard}rem`,
      }
    },
  },
  created() {
    this.collapseItemID = uuidv4()
    this.visible = this.isVisible
  },
  methods: {
    updateVisible(val = true) {
      this.visible = val
      this.$emit('visible', val)
    },
    collapseOpen() {
      if (this.openOnHover) this.updateVisible(true)
    },
    collapseClose() {
      if (this.openOnHover) this.updateVisible(false)
    },
  },
}
</script>

<style scoped lang="scss">
.collapse-icon [data-toggle=collapse]:after {
  margin-top: -10px !important;
}

.header-items {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
