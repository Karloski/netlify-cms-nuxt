<template>
  <div class="home">
    <video class="w-screen fixed lg:h-screen object-cover" src="/img/background.mp4" autoplay loop />
    <nuxt class="flex w-screen h-screen p-8" />
  </div>
</template>

<style scoped lang="scss">
  video {
    z-index: -1;
  }
</style>
