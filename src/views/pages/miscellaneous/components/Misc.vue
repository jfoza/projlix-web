<template>
  <div class="page-misc">
    <section class="page-misc-logo">
      <application-logo />
    </section>

    <section class="page-misc-card">
      <slot />
    </section>
  </div>
</template>

<script>
import ApplicationLogo from '@/views/components/custom/ApplicationLogo.vue'

export default {
  components: {
    ApplicationLogo,
  },
}
</script>

<style lang='scss'>
  @import '@/assets/scss/variables/variables';

  .page-misc {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
  }

  .page-misc-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    padding: 37px 27px 27px 27px;
    background-color: $bg-200;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    margin-top: 20px;
  }

  .icon-page-misc svg {
    width: 80px;
    height: 80px;
  }
</style>
