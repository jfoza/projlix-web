<template>
  <div class="main-login">
    <slot />
  </div>
</template>

<script>

export default {}

</script>

<style scoped lang="scss">
.main-login {
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
}

@media (height < 582px) {
  .main-login {
    overflow-y: scroll;
  }
}
</style>
