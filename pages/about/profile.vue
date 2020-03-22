<template>
  <div class="flex flex-col flex-auto -my-4 relative md:static">
    <div class="relative text-center py-4 md:static">
      <h1>
        Profile
      </h1>
      <CategoryMenu :menu="menu" class="absolute top-0 right-0 md:transform md:scale-75" />
    </div>
    <div class="flex -mx-4 py-4 md:flex-col md:-my-4 md:-mx-0 md:items-center">
      <img :src="portrait" alt="8Bit Avatar" class="w-full max-w-lg px-4 md:px-0 md:py-4">
      <div class="flex-auto px-4 md:px-0 md:py-4">
        {{ content }}
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
    const data = await require('@/assets/content/pages/about/profile.json')
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

<style scoped lang="scss">
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

// FIXME: Temporary solution i.e., permanent solution
@media all and (max-width: 767px) {
  .categories-active {
    top: -1.25rem;
    right: -1.25rem;
  }
}
</style>
