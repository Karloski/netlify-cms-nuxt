<template>
  <div class="projects flex flex-col flex-auto -my-4">
    <h1 class="text-center py-4">
      My Projects
    </h1>
    <div class="projects-list flex flex-auto justify-center items-center py-4">
      <transition-group v-if="projects.length > 0" name="gallery" tag="div" class="projects-item flex flex-wrap flex-auto w-full justify-center content-evenly">
        <div v-for="project in projects" :key="project.title" class="relative overflow-hidden w-full max-w-xl m-4 transition-all duration-500 bg-cover bg-center rounded-lg" :style="`background-image: url(${project.images[0]})`">
          <div class="projects-item-mask flex items-center justify-center h-full w-full absolute transform translate-y-full">
            <nuxt-link :to="`/projects/${project.slug}`" class="px-6 py-4 bg-transparent border rounded-lg button">
              View Project
            </nuxt-link>
          </div>
        </div>
      </transition-group>

      <!-- <transition-group name="list" tag="div">
        <div v-for="project in projects" :key="project.title" class="projects-item flex flex-wrap md:flex-col md:items-center justify-center -mx-4 py-4">
          <nuxt-link :to="`/projects/${project.slug}`" class="flex-initial hover:background-tiertiary hover:mask py-4">
            <img class="md:w-full max-w-xl px-4 transition duration-700 md:py-4" :src="project.images[0]" :alt="project.title">
          </nuxt-link>
          <div class="projects-item-excerpt flex-auto md:text-center p-4 -my-4">
            <h4 class="py-4">
              <nuxt-link :to="`/projects/${project.slug}`">
                {{ project.title }}
              </nuxt-link>
            </h4>
            <p class="markdown-body py-4" v-html="$md.render(excerpt(project.about, 300))" />
            <p class="py-4">
              <nuxt-link :to="`/projects/${project.slug}`">
                Read More...
              </nuxt-link>
            </p>
          </div>
        </div>
      </transition-group> -->
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'slide',
    mode: 'out-in'
  },
  layout: 'projection',
  computed: {
    projects () {
      return this.$store.state.projects
    }
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
