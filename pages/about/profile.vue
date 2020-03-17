<template>
  <div class="flex flex-col flex-auto -my-4 relative">
    <div class="relative text-center py-4">
      <h1>
        Profile
      </h1>
      <CategoryMenu :menu="menu" class="absolute top-0 right-0" />
    </div>
    <div class="flex -mx-4 py-4">
      <img :src="portrait" alt="8Bit Avatar" class="max-w-lg px-4">
      <div class="flex-auto px-4">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu'

export default {
  layout: 'projection',
  async asyncData ({ context }) {
    const data = await require('@/assets/content/pages/about/profile.json')
    let menu = await require.context('@/assets/content/pages/about/', false, /\.json$/).keys().reduce((carry, name) => {
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
  },
  components: {
    CategoryMenu
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
</style>
