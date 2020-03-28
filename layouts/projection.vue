<template>
  <div class="projection flex flex-col w-screen h-screen p-4 overflow-hidden">
    <div class="hidden lg:flex">
      <Burger @click="show.sidebar = !show.sidebar" />
      <Sidebar :is-open="show.sidebar" class="text-center" @close="show.sidebar = false">
        <h2>
          <nuxt-link to="/">
            carlwithak
          </nuxt-link>
        </h2>
        <div class="flex flex-auto py-12">
          <div class="flex flex-col flex-auto items-center -my-4">
            <h3 class="py-4" @click="show.sidebar = false">
              <nuxt-link to="/projects">
                Projects
              </nuxt-link>
            </h3>
            <h3 class="py-4" @click="show.sidebar = false">
              <nuxt-link to="/about">
                About
              </nuxt-link>
            </h3>
            <h3 class="py-4" @click="show.sidebar = false">
              <nuxt-link to="/blog">
                Blog
              </nuxt-link>
            </h3>
          </div>
        </div>
        <div class="footer flex justify-between">
          <span>FB</span>
          <span>Twitter</span>
          <span>Github</span>
        </div>
      </Sidebar>
    </div>
    <div class="header flex justify-between items-center lg:hidden">
      <h1 class="title">
        <nuxt-link to="/">
          carlwithak
        </nuxt-link>
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
    <div class="footer -mx-4 md:hidden">
      <span class="px-4">FB</span>
      <span class="px-4">Twitter</span>
      <span class="px-4">Github</span>
    </div>
    <video class="fixed top-0 left-0 w-screen h-screen object-cover object-top" src="/img/background.mp4" autoplay loop />
  </div>
</template>

<script>
import Burger from '@/components/Burger'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    Burger, Sidebar
  },
  data () {
    return {
      show: {
        sidebar: false
      }
    }
  }
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
</style>
