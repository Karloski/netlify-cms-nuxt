<template>
  <div class="projection flex flex-col w-screen h-screen p-4 overflow-hidden">
    <div class="hidden xl:flex">
      <Burger @click="show.sidebar = !show.sidebar" />
      <Sidebar :is-open="show.sidebar" class="text-center" @close="show.sidebar = false">
        <h2>
          <nuxt-link to="/">
            carlwithak
          </nuxt-link>
        </h2>
        <div class="flex flex-auto py-12">
          <div class="flex flex-col flex-auto items-center -my-4">
            <h3 v-for="(children, page) of this.$store.state.structure" :key="page" class="py-4 capitalize" @click="show.sidebar = false">
              <div v-if="Object.keys(children).length > 0">
                <span>{{ page }}</span>
                <span>></span>
              </div>
              <nuxt-link v-else :to="`/${page}`">
                {{ page }}
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
    <div class="header flex justify-between items-center xl:hidden relative" @mouseleave="nav.selected = ''">
      <h1 class="title">
        <nuxt-link to="/">
          carlwithak
        </nuxt-link>
      </h1>
      <nav class="inline-flex -mx-4">
        <h2 v-for="(children, page) of this.$store.state.structure" :key="page" class="px-4 capitalize" @mouseover="nav.selected = page">
          <nuxt-link :to="`/${page}`">
            {{ page }}
          </nuxt-link>
        </h2>
      </nav>
      <div v-if="Object.keys(navSelection).length > 0" class="subnav absolute w-full transition ease-in duration-700 flex justify-end p-8 rounded-b-lg">
        <div v-for="(children, page) in navSelection" :key="page" class="mx-4 capitalize">
          <nuxt-link :to="`/${nav.selected}/${page}`">
            <h3>{{ page }}</h3>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="content flex flex-auto rounded my-8 overflow-auto w-7/10 xl:w-full">
      <nuxt class="p-8 md:px-4 md:py-0" />
    </div>
    <div class="footer -mx-4 md:hidden">
      <span class="px-4">FB</span>
      <span class="px-4">Twitter</span>
      <span class="px-4">Github</span>
    </div>
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
      },
      nav: {
        selected: ''
      }
    }
  },
  computed: {
    navSelection () {
      if (this.nav.selected && this.$store.state.structure[this.nav.selected]) {
        return this.$store.state.structure[this.nav.selected]
      }
      return {}
    }
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .subnav {
    border-top: 1px solid;
    top: 70px;
    z-index: 1000;
    background: #1a0625;
  }

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
