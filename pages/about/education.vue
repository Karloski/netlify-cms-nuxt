<template>
  <div class="flex flex-col flex-auto -my-4 relative md:static">
    <div class="text-center py-4 relative md:static">
      <h1>
        Education
      </h1>
      <CategoryMenu :menu="menu" class="absolute top-0 right-0 md:transform md:scale-75" />
    </div>
    <div class="flex flex-col flex-auto justify-center items-center py-4 -my-8 lg:-my-4">
      <div v-for="institution in institutions" :key="institution.name" class="flex items-center justify-center -mx-4 py-8 lg:py-4">
        <div class="flex md:flex-col md:items-center flex-auto px-4 -mx-4">
          <img class="w-full max-w-lg px-4 h-64 md:object-contain md:py-4" :src="institution.logo" :alt="institution.name">
          <div class="md:text-center px-4 -my-4">
            <h4 class="py-4">
              {{ institution.name }}
            </h4>
            <p class="py-4">
              {{ institution.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu'

export default {
  layout: 'projection',
  components: {
    CategoryMenu
  },
  async asyncData ({ context }) {
    const data = await require('@/assets/content/pages/about/education.json')
    const menu = await require.context('@/assets/content/pages/about/', false, /\.json$/).keys().reduce((carry, name) => {
      name = /\.\/(.*)\.json/.exec(name)[1]

      carry.push({
        name,
        link: `/about/${name}`,
        icon: '/img/php.svg'
      })

      return carry
    }, [])

    return {
      ...data,
      menu
    }
  }
}
</script>

<style lang="scss" scoped>
// FIXME: Temporary solution i.e., permanent solution
@media all and (max-width: 767px) {
  .categories-active {
    top: -1.25rem;
    right: -1.25rem;
  }
}
</style>
