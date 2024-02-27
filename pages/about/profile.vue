<template>
  <div class="profile flex flex-col flex-auto relative md:static">
    <div class="relative text-center py-4 md:static">
      <h1>
        Profile
      </h1>
    </div>
    <div class="flex py-4 md:flex-col md:items-center overflow-auto">
      <img :src="portrait" alt="8Bit Avatar" class="w-full max-w-lg px-4 md:px-0 md:py-4" />
      <div class="flex-auto px-4 md:px-0 md:py-4 markdown-body overflow-auto" v-html="$md.render(content)" style="font-size: 1.15rem;" />
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
.profile {
  img {
    max-height: clamp(16rem, 35vw, 20rem);
    object-fit: contain;
  }
}
</style>
