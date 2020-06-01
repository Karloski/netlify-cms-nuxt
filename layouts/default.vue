<template>
  <div class="home">
    <nuxt class="flex w-screen h-screen p-8" />
  </div>
</template>

<style lang="scss">
.layout-enter-active, .layout-leave-to {
  transition: opacity .3s linear;
}
.layout-enter, .layout-leave-to {
  opacity: 0;
}

// Dynamically generated content will not load in the relevant CSS
// unless it is mentioned somewhere in the files.
// While I want to do this in the external SCSS files,
// the styles simply won't be loaded for production if you do this.
.markdown-body {
    font-family: 'PT Mono', monospace;

    a {
      color: #DBAB00 !important;

      &:hover {
        text-decoration: none;
      }
    }

    a, p, span {
      word-wrap: break-word;
      word-break: break-word;
    }

    p a, span a {
      text-decoration: underline;
    }

    ol li {
      list-style-type: decimal !important;
      text-align: left;
    }

    ul li {
      list-style-type: disc !important;
      text-align: left;
    }
}

.svg-inline--fa {} .fa-chevron-right {} .fa-w-10 {}

.projects {
  &-item {
    &-header {
      @media all and (min-width: 767px) {
        &:hover img {
          height: 32rem;
        }

        img {
          transition: height 0.25s ease;
        }
      }
    }

    &-resources {
      a, a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
