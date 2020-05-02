<template>
  <div class="flex flex-col flex-auto -my-4 relative md:static">
    <div class="text-center py-4 relative md:static">
      <h1>
        Education
      </h1>
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
export default {
  layout: 'projection',
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
