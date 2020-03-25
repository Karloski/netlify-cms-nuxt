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
    <div class="markdown-body md:text-center" v-html="$md.render(content)" />
  </div>
</template>

<script>
export default {
  layout: 'projection',
  asyncData ({ params }) {
    return require(`@/assets/content/pages/projects/${params.slug}`)
  }
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
