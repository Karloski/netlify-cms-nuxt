<template>
  <div class="flex flex-col flex-auto">
    <h1 class="text-center">
      My Projects
    </h1>
    <div class="flex-auto">
      Inner content
    </div>
    <div class="flex flex-col items-center -my-3">
      <div class="flex flex-col py-3 -my-1">
        <div class="flex justify-center triangle triangle-xs py-1">
          <div class="opacity-25"></div>
          <div class="opacity-25"></div>
        </div>
        <div class="flex justify-center triangle triangle-s py-1">
          <div class="opacity-50"></div>
          <div class="opacity-50"></div>
        </div>
        <div class="flex justify-center triangle py-1">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="py-3">
        More
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'projection'
}
</script>

<style scoped lang="scss">
</style>
