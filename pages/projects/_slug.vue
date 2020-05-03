<template>
  <div class="flex flex-col flex-auto -my-4">
    <div class="py-4 w-full relative">
      <div class="bg-gray-900 mask-light w-full">
        <img class="rounded-lg object-cover h-64" :src="images[0]" :alt="title">
      </div>
      <h2 class="absolute bottom-0 left-0 p-4 text-shadow-darkened">
        {{ title }}
      </h2>
    </div>
    <div class="markdown-body md:text-center py-4" v-html="$md.render(content)" />
    <div class="flex items-center relative py-4 my-4">
      <nuxt-link v-if="index > 0" :to="`/projects/${previous.slug}`" class="button flex items-center absolute left-0">
        <font-awesome-icon icon="chevron-left" />
        <span class="pl-2 md:hidden">
          {{ previous.title }}
        </span>
      </nuxt-link>
      <nuxt-link :to="'/projects'" class="button absolute absolute-center-x">
        Back
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
export default {
  transition: {
    name: 'slide',
    mode: 'out-in'
  },
  layout: 'projection',
  asyncData ({ params }) {
    return require(`@/assets/content/pages/projects/${params.slug}`)
  },
  data () {
    return {
      ...this.$data,
      index: 0
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
