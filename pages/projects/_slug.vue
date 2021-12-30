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
      <h2 class="border-b border-current py-4">
        About this project
      </h2>
      <div class="markdown-body py-4" v-html="$md.render(about)" />
    </div>
    <div class="projects-item-technical">
      <h2 class="border-b border-current py-4">
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
      <h2 class="border-b border-current py-4">
        Resources
      </h2>
      <ul class="flex flex-col py-4">
        <li v-for="(resource, index) in resources" :key="index" class="py-2">
          <a :href="resource.path" target="_blank">
            <font-awesome-icon icon="external-link-alt" /> <span>{{ resource.label }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="flex items-center relative py-8 md:py-4 my-4">
      <nuxt-link v-if="index > 0" :to="`/projects/${previous.slug}`" class="button flex items-center absolute left-0">
        <font-awesome-icon icon="chevron-left" />
        <span class="pl-2 md:hidden">
          {{ previous.title }}
        </span>
      </nuxt-link>
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
import mime from 'mime-types'

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

    // FIXME: Remove from assets instead
    delete data.carouselData

    return {
      url: '',
      resources: '',
      ...data
    }
  },
  data () {
    return {
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
    },
    carouselData () {
      return (this.carouselItems ?? []).map((carousel, id) => {
        return {
          id,
          content: (createElement) => {
            const picture = createElement('picture', [
              ...carousel.images.map((img) => {
                if (!img.default) {
                  return createElement('source', {
                    attrs: {
                      srcset: img.source,
                      type: mime.lookup(img.source) || 'image/jpeg',
                      class: 'w-full rounded-lg object-cover h-64'
                    }
                  })
                }
              }),
              createElement('img', {
                attrs: {
                  src: (carousel.images.find(img => !(mime.lookup(img.source) || '').includes('webp')) ?? carousel.images[0]).source,
                  alt: carousel.alt ? carousel.alt : this.title,
                  class: 'w-full rounded-lg object-cover h-64'
                }
              })
            ])

            return picture
          }
        }
      })

      return this.images.map((img, id) => {
        return {
          id,
          content (createElement) {
            const picture = createElement('picture', [
              createElement('source', {
                attrs: {
                  srcset: img,
                  type: "image/webp"
                }
              }),
              createElement('img', {
                attrs: {
                  src: img,
                  alt: this.title,
                  class: 'w-full rounded-lg object-cover h-64'
                }                
              })
            ])

            return picture
            return createElement('img', {
              attrs: {
                src: img,
                alt: this.title,
                class: 'w-full rounded-lg object-cover h-64'
              }
            })
          }          
        }
      })
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
