<template>
  <div class="breadcrumb">
    <div v-for="(crumb, index) of crumbs" :key="crumb" class="flex -mx-2">
      <span class="capitalize px-2">{{ crumb }}</span>
      <span v-if="index !== crumb.length - 1" class="px-2">
        {{ delimiter }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      default: () => {
        return []
      }
    },
    delimiter: {
      type: String,
      default: () => {
        return '/'
      }
    }
  }
}
</script>

<style>

</style>
