<template>
  <img
    :style="getImgStyles"
    :src="require('@/assets/images/custom/projlix-green-medium.png')"
    alt=""
  >
</template>

<script>
export default {
  props: {
    imgWidth: {
      type: String,
      default: '124px',
    },
    imgHeight: {
      type: String,
      default: '30px',
    },
  },

  computed: {
    getImgStyles() {
      return {
        maxWidth: this.imgWidth,
        maxHeight: this.imgHeight,
      }
    },
  },
}
</script>
