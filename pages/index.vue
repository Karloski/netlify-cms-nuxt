<template>
  <div>
    <div class="flex flex-auto justify-center items-center relative">
      <h1 class="title absolute top-0 left-0 inline-flex flex-col text-center">
        <span>carl</span>
        <span>withak</span>
      </h1>
      <nav class="-my-4 text-center">
        <h1 class="py-4">
          <nuxt-link to="projects">
            Projects
          </nuxt-link>
        </h1>
        <h1 class="py-4">
          <nuxt-link to="about/profile">
            About
          </nuxt-link>
        </h1>
        <h1 class="py-4">
          <nuxt-link to="blog">
            Blog
          </nuxt-link>
        </h1>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      // script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    &.title {
      @media all and (max-width: 767px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
