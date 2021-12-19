<template>
  <div class="projects-item flex flex-col flex-auto -my-4">
    <div class="projects-item-header py-4 w-full relative">
      <div class="bg-gray-900 mask-light w-full">
        <client-only placeholder="Loading...">
          <carousel :data="carouselData" />
        </client-only>
      </div>
      <h2 class="absolute bottom-0 left-0 p-4 text-shadow-darkened">
        <a v-if="url" :href="url" target="_blank">
          {{ title }}
        </a>
        <span v-else>
          {{ title }}
        </span>
      </h2>
    </div>
    <div class="projects-item-about">
      <h2 class="border-b border-current py-4 md:text-center">
        About this project
      </h2>
      <div class="markdown-body md:text-center py-4" v-html="$md.render(about)" />
    </div>
    <div class="projects-item-technical">
      <h2 class="border-b border-current py-4 md:text-center">
        Tech Stack
      </h2>
      <div class="mt-4">
        Below are the technologies and frameworks that I have been exposed to as part of this project.
      </div>
      <div v-if="stack" class="flex flex-wrap justify-start -mx-4 py-2 gap-2">
        <Skill v-for="item in stack" :key="item" :name="item" />
      </div>
    </div>
    <div v-if="resources && resources.length > 0" class="projects-item-resources">
      <h2 class="border-b border-current py-4 md:text-center">
        Resources
      </h2>
      <div class="markdown-body md:text-center py-4" v-html="$md.render(resources)" />
    </div>
    <div class="flex items-center relative py-8 md:py-4 my-4">
      <nuxt-link v-if="index > 0" :to="`/projects/${previous.slug}`" class="button flex items-center absolute left-0">
        <font-awesome-icon icon="chevron-left" />
        <span class="pl-2 md:hidden">
          {{ previous.title }}
        </span>
      </nuxt-link>
      <a class="button absolute absolute-center-x cursor-pointer" @click.prevent="$router.push({ path: route.from })">
        Back
      </a>
      <nuxt-link v-if="index < $store.state.projects.length - 1" :to="`/projects/${next.slug}`" class="button flex items-center absolute right-0">
        <span class="pr-2 md:hidden">
          {{ next.title }}
        </span>
        <font-awesome-icon icon="chevron-right" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Skill from '@/components/Skill'

export default {
  components: {
    Skill
  },
  transition: {
    name: 'slide',
    mode: 'out-in'
  },
  layout: 'projection',
  asyncData ({ params }) {
    const data = require(`@/assets/content/pages/projects/${params.slug}`)
    const carouselData = []

    for (let id = 0; id < data.images.length; id++) {
      carouselData.push({
        id,
        content (createElement, content) {
          return createElement('img', {
            attrs: {
              src: data.images[id],
              alt: data.title,
              class: 'w-full rounded-lg object-cover h-64'
            }
          })
        }
      })
    }

    return {
      url: '',
      resources: '',
      carouselData,
      ...data
    }
  },
  data () {
    return {
      ...this.$data,
      index: 0,
      route: {
        from: '/projects'
      }
    }
  },
  computed: {
    previous () {
      return this.$store.state.projects[this.index - 1]
    },
    next () {
      return this.$store.state.projects[this.index + 1]
    }
  },
  created () {
    this.index = this.$store.state.projects.findIndex(p => p.title === this.title)
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.route.from = from.name !== null ? from.fullPath : '/projects'
    })
  }
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
}

button, .button {
  background: #DBAB00;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  * {
    color: inherit;
  }
}
</style>
