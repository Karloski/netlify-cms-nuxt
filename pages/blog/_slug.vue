<template>
  <div class="flex flex-col flex-auto -my-4">
    <div class="py-4 w-full relative">
      <div class="bg-gray-900 mask-light w-full">
        <img class="rounded-lg object-cover h-64 w-full" :src="featured_image" :alt="title">
      </div>
      <h2 class="absolute bottom-0 left-0 p-4 text-shadow-darkened">
        {{ title }}
      </h2>
    </div>
    <div class="markdown-body md:text-center py-4" v-html="$md.render(body)" />
    <div class="flex items-center relative py-4 my-4">
      <nuxt-link v-if="index > 0" :to="`/blog/${previous.slug}`" class="button flex items-center absolute left-0">
        <font-awesome-icon icon="chevron-left" />
        <span class="pl-2 md:hidden">
          {{ previous.title }}
        </span>
      </nuxt-link>
      <nuxt-link :to="'/blog'" class="button absolute absolute-center-x">
        Back
      </nuxt-link>
      <nuxt-link v-if="index < $store.state.posts.length - 1" :to="`/blog/${next.slug}`" class="button flex items-center absolute right-0">
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
    return require(`@/assets/content/blog/${params.slug}`)
  },
  computed: {
    previous () {
      return this.$store.state.posts[this.index - 1]
    },
    next () {
      return this.$store.state.posts[this.index + 1]
    }
  },
  created () {
    this.index = this.$store.state.posts.findIndex(p => p.title === this.title)
  }
}
</script>

<style lang="scss" scoped>
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
