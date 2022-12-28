<template>
  <div class="projects flex flex-col flex-auto">
    <h1 class="text-center py-4">
      My Projects
    </h1>
    <div class="projects-list flex flex-auto overflow-auto justify-center items-start py-4">
      <transition-group v-if="projects.length > 0" name="gallery" tag="div" class="projects-item flex flex-wrap flex-auto w-full justify-center content-evenly">
        <div v-for="project in projects" :key="project.title" class="relative overflow-hidden w-full max-w-xl m-4 transition-all duration-500 bg-cover bg-center rounded-lg" :style="`background-image: url(${project.carouselItems[0].images[0].source})`">
          <div class="projects-item-mask flex flex-col gap-4 items-center justify-center h-full w-full absolute transform translate-y-full">
            <span class="text-xl font-bold">
              {{ project.title }}
            </span>

            <span>
              {{ excerpt(project.about) }}
            </span>

            <nuxt-link :to="`/projects/${project.slug}`" class="px-6 py-4 bg-transparent border rounded-lg button">
              View Project
            </nuxt-link>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { createExcerpt } from '~/common/util'

export default {
  transition: {
    name: 'slide',
    mode: 'out-in'
  },
  layout: 'projection',
  data () {
    return {
      title: 'Projects'
    }
  },
  computed: {
    projects () {
      return this.$store.state.projects
    }
  },
  methods: {
    excerpt (text) {
      return createExcerpt({
        text,
        length: 50
      })
    },
  }
}
</script>

<style scoped lang="scss">
.projects {
  &-item {

    > div {
      height: clamp(8rem, 50vw, 16rem);

      &:hover {
        .projects-item-mask {
          transform: translateY(0%);
        }
      }
    }

    &-mask {
      background: #170122bd;
      transition: transform 500ms ease;
    }
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
