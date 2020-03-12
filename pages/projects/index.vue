<template>
  <div class="flex flex-col flex-auto -my-4">
    <h1 class="text-center py-4">
      My Projects
    </h1>
    <div class="flex flex-col flex-auto justify-center items-center -my-4 py-4">
      <transition-group name="list" tag="div">
        <div class="flex justify-between -mx-4 py-4" v-for="project in projects" :key="project.title">
          <img class="max-w-lg px-4" :src="project.images[0]" :alt="project.title">
          <div class="flex-auto px-4">
            <p>{{ excerpt(project.content, 300) }} Read More...</p>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="flex justify-center items-center py-4">
      <div class="flex flex-col items-center -my-3 cursor-pointer" @click="more()">
        <div class="flex flex-col py-3 -my-1">
          <div class="flex justify-center triangle triangle-xs py-1">
            <div class="opacity-25"></div>
            <div class="opacity-25"></div>
          </div>
          <div class="flex justify-center triangle triangle-s py-1">
            <div class="opacity-50"></div>
            <div class="opacity-50"></div>
          </div>
          <div class="flex justify-center triangle py-1">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createExcerpt } from '@/common/util'

export default {
  layout: 'projection',
  data () {
    return {
      count: 2
    }
  },
  methods: {
    excerpt (text, length = 150) {
      return createExcerpt({ text, length })
    },
    more () {
      if (this.count + 2 >= this.$store.state.projects.length) {
        this.count = this.$store.state.projects.length
      } else {
        this.count += 2
      }
    }
  },
  computed: {
    /* eslint object-shorthand: "off" */
    projects () {
      // FIXME: Lazy.
      return this.$store.state.projects.slice(0, this.count)
    }
  }
}
</script>

<style scoped lang="scss">
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
