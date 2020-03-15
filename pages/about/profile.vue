<template>
  <div class="flex flex-col flex-auto -my-4">
    <h1 class="text-center py-4">
      Profile
    </h1>
    <div class="flex -mx-4 py-4">
      <img :src="portrait" alt="8Bit Avatar" class="max-w-lg px-4">
      <div class="flex-auto px-4">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'projection',
  asyncData ({ context }) {
    return require('@/assets/content/pages/about/profile.json')
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
