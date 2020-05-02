<template>
  <div class="home">
    <!-- <video class="w-screen fixed lg:h-screen object-cover" src="/img/background.mp4" autoplay loop /> -->
    <nuxt class="flex w-screen h-screen p-8" />
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
</script>

<style scoped lang="scss">
  video {
    z-index: -1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
