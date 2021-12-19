<template>
  <div>
    <nuxt-link v-tooltip="item.name" class="stack-item flex m-4 bg-white rounded-full" :to="`/about/skills?name=${item.name}`">
      <img :src="item.icon" :alt="item.name" class="icon-l cursor-pointer rounded-full">
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      item: { name: '', icon: '' }
    }
  },
  created () {
    this.item = this.$store.getters.GET_SKILL(this.name)
  }
}
</script>

<style scoped>
.stack-item {
  transition: box-shadow 500ms ease;
}

.stack-item:hover {
  box-shadow: 0 0 5px 3px #dbab00;
}
</style>
