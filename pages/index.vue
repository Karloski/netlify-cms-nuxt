<template>
  <div>
    <div class="home-container flex lg:flex-col flex-auto justify-center items-center relative">
      <h1 class="title absolute top-0 left-0 inline-flex flex-col text-center">
        <span>carl</span>
        <span>withak</span>
      </h1>
      <nav class="-my-4 text-center">
        <h1 class="py-4">
          <nuxt-link ref="projects" to="projects">
            Projects
          </nuxt-link>
        </h1>
        <h1 class="py-4">
          <nuxt-link ref="about-profile" to="about/profile">
            About
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
  },
  beforeRouteLeave (to, from, next) {
    this.animateCss(this.$refs[to.name].$el, 'flash').then(() => {
      next()
    })
  }
}
</script>

<style lang="scss" scoped>
  .home {
    &-container {
      nav h1 {
        font-size: 2rem;
        font-size: clamp(2rem, 5vw, 2.5rem);
      }

      @media (orientation: landscape) and (max-width: 1023px) {
        justify-content: space-between;
      }

      .title {
        @media all and (max-width: 767px) {
          left: 50%;
          transform: translateX(-50%);
        }

        @media (orientation: landscape) and (max-width: 1023px) {
          flex-direction: row;
          position: relative;
          width: 100%;
          justify-content: center;
          padding-bottom: 1rem;
        }
      }
    }
  }
</style>
