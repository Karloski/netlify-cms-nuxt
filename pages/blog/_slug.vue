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
    <div class="markdown-body" v-html="$md.render(body)" />
  </div>
</template>

<script>
export default {
  layout: 'projection',
  asyncData ({ params }) {
    return require(`@/assets/content/blog/${params.slug}`)
  }
}
</script>
