<template>
  <div class="projection flex flex-col w-screen h-screen p-4 overflow-hidden">
    <div class="hidden lg:flex">
      <Slide>
        Some content
      </Slide>
    </div>
    <div class="header flex justify-between items-center lg:hidden">
      <h1 class="title">
        <nuxt-link to="/">carlwithak</nuxt-link>
      </h1>
      <nav class="inline-flex -mx-4">
        <h2 class="px-4">
          <nuxt-link to="/projects">
            Projects
          </nuxt-link>
        </h2>
        <h2 class="px-4">
          <nuxt-link to="/about">
            About
          </nuxt-link>
        </h2>
        <h2 class="px-4">
          <nuxt-link to="/blog">
            Blog
          </nuxt-link>
        </h2>
      </nav>
    </div>
    <div class="content flex flex-auto rounded my-8 overflow-auto w-7/10 xl:w-full">
      <nuxt class="p-8 md:px-4 md:py-0" />
    </div>
    <div class="footer -mx-4 md:flex md:justify-center md:items-center">
      <span class="px-4">FB</span>
      <span class="px-4">Twitter</span>
      <span class="px-4">Github</span>
    </div>
    <video class="fixed top-0 left-0 w-screen xl:h-screen xl:w-auto object-cover" src="/img/background.mp4" autoplay loop />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
  video {
    z-index: -1;
  }

  .projection {
    transition: 0.2s all;

    @media all and (max-width: 1279px) {
      background-color: rgba(24, 16, 37, 0.9);
    }

    .content {
      transition: 0.2s all;

      @media all and (min-width: 767px) {
        box-shadow: 0px 0px 5px 10px #3D275E;
        background-color: rgba(24, 16, 37, 0.9);
      }

      @media all and (min-width: 1279px) {
        /* width */
        &::-webkit-scrollbar {
          width: 5px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: transparent;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
          background: #290C43;
        }

        &:hover {
          &::-webkit-scrollbar-thumb {
            background: #623589
          }
        }
      }
    }
  }
</style>
