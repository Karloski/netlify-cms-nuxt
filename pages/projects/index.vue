<template>
  <div class="flex flex-col flex-auto">
    <h1 class="text-center">
      My Projects
    </h1>
    <div class="flex flex-col flex-auto justify-center items-center">
      <transition-group name="list" tag="div">
        <div class="flex justify-between" v-for="project in projects" :key="project.title">
          <img :src="project.images[0]" :alt="project.title">
          <p>{{ excerpt(project.content) }} Read More...</p>
        </div>
      </transition-group>
    </div>
    <div class="flex justify-center items-center">
      <div class="flex flex-col items-center -my-3 cursor-pointer" @click="page--">
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
        <div class="py-3">
          Previous
        </div>
      </div>
      <div class="flex flex-col items-center -my-3 cursor-pointer" @click="page++">
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
        <div class="py-3">
          Next
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createExcerpt } from '@/common/util'

export default {
  layout: 'projection',
  data() {
    return {
      page: 0,
      pageLength: 2
    }
  },
  methods: {
    excerpt: (blurb) => {
      return createExcerpt({ text: blurb })
    }
  },
  computed: {
    projects: function () {
      // return this.$store.state.projects
      return this.$store.state.projects.slice(this.pageLength * this.page, this.pageLength * this.page + this.pageLength)
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
