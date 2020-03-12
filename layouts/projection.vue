<template>
  <div class="projection flex flex-col w-screen h-screen p-8">
    <div class="header flex justify-between items-center">
      <h1 class="title">
        carlwithak
      </h1>
      <nav class="inline-flex -mx-4">
        <h2 class="px-4">
          <nuxt-link to="projects">
            Projects
          </nuxt-link>
        </h2>
        <h2 class="px-4">
          <nuxt-link to="about">
            About
          </nuxt-link>
        </h2>
        <h2 class="px-4">
          <nuxt-link to="blog">
            Blog
          </nuxt-link>
        </h2>
      </nav>
    </div>
    <div class="content flex flex-auto background-tiertary background-darkened rounded my-8 overflow-auto">
      <nuxt class="p-8" />
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
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #290C43;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #623589;
    }
  }
</style>
