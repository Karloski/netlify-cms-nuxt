<template>
  <div>
    <video class="w-screen fixed" src="/img/background.mp4" autoplay loop />
    <nuxt class="flex w-screen h-screen p-8" />
  </div>
</template>

<style scoped>
  video {
    z-index: -1;
  }
</style>
