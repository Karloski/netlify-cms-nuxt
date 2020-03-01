<template>
  <div class="projection flex flex-col w-screen h-screen p-4">
    <div class="header flex justify-between items-center">
      <h1 class="title">
        carlwithak
      </h1>
      <nav class="inline-flex -mx-4">
        <h2 class="px-4">
          Projects
        </h2>
        <h2 class="px-4">
          About
        </h2>
        <h2 class="px-4">
          Blog
        </h2>
      </nav>
    </div>
    <div class="content background-tiertary background-darkened rounded my-4">
      <nuxt class="p-4" />
    </div>
    <div class="footer -mx-4">
      <span class="px-4">FB</span>
      <span class="px-4">Twitter</span>
      <span class="px-4">Github</span>
    </div>
    <video class="w-screen fixed top-0 left-0" src="/img/background.mp4" autoplay loop />
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  video {
    z-index: -1;
  }

  .projection {
    .content {
      box-shadow: 0px 0px 5px 10px #3D275E;
      width: 70%;
      flex: 1;
    }
  }
</style>
