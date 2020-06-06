<template>
  <div class="skills flex flex-col flex-auto -my-4 relative md:static">
    <div class="relative text-center py-4 md:static">
      <h1>
        Skills
      </h1>
    </div>
    <div class="flex flex-auto -mx-4">
      <div class="flex flex-col flex-auto -my-2 py-2">
        <div class="flex justify-center items-center mx-auto w-full max-w-lg py-2 relative">
          <div v-if="selectedCategory > 0" class="absolute left-0" @click="selectedCategory--">
            <font-awesome-icon icon="chevron-left" class="cursor-pointer" />
          </div>
          <h4>
            {{ shownCategory.name }}
          </h4>
          <div v-if="selectedCategory + 1 < categories.length" class="absolute right-0" @click="selectedCategory++">
            <font-awesome-icon icon="chevron-right" class="cursor-pointer" />
          </div>
        </div>
        <div class="skills-subcat flex flex-wrap justify-center -mx-4 py-2">
          <div v-for="(subcat, subindex) in shownCategory.subcategories" :key="subcat.name" v-tooltip="subcat.name" class="m-4 bg-white rounded-full">
            <img :src="subcat.icon" :alt="subcat.name" :class="'icon-l cursor-pointer rounded-full' + (selectedSubcat === subindex ? ' skills-subcat-selected' : '')" @click="selectedSubcat = subindex">
          </div>
        </div>
        <transition name="fade">
          <div v-if="examples.length > 0" class="flex flex-auto flex-col justify-center my-4">
            <div class="flex justify-center my-2">
              <h4>Examples</h4>
            </div>
            <div class="skills-examples flex flex-col flex-auto items-center justify-start my-4 text-center">
              <transition-group name="gallery" tag="div" class="skills-examples-item flex flex-wrap flex-auto w-full justify-center content-start items-start">
                <div v-for="example in examples" :key="example.title" class="relative overflow-hidden h-full w-full max-w-xl m-4 transition-all duration-500 bg-cover bg-center rounded-lg" :style="`background-image: url(${example.images[0]})`">
                  <div class="skills-examples-mask flex items-center justify-center w-full h-full absolute transform translate-y-full">
                    <nuxt-link :to="`/projects/${example.slug}`" class="px-6 py-4 bg-transparent border rounded-lg">
                      View Project
                    </nuxt-link>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </transition>
      </div>
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
    const data = await require('@/assets/content/pages/about/skills.json')

    return {
      ...data
    }
  },
  data () {
    return {
      selectedCategory: 0,
      selectedSubcat: 0
    }
  },
  computed: {
    shownCategory () {
      return this.categories[this.selectedCategory]
    },
    subcatName () {
      return this.categories[this.selectedCategory].subcategories[this.selectedSubcat].name
    },
    examples () {
      const regex = new RegExp(`\\b${this.subcatName}\\b`, 'i')

      return this.$store.state.projects.filter((p) => {
        return regex.exec(p.technical) !== null
      })
    }
  },
  mounted () {
    this.selectedCategory = 0
  }
}
</script>

<style lang="scss" scoped>
.skills {
  &-examples {
    &-item {
      > div {
        max-height: 16rem;

        &:hover {
          .skills-examples-mask {
            transform: translateY(0%);
          }
        }
      }
    }

    &-mask {
      background: #170122bd;
      transition: transform 500ms ease;

      a {
        border-color: #DBAB00;
      }

      a:hover {
        background: #DBAB00;
        text-shadow: none;
        color: white;
      }
    }
  }

  &-subcat {
    img {
      transition: box-shadow 700ms ease;
    }

    &-selected {
      box-shadow: 0 0 5px 3px #dbab00;
    }
  }
}

.gallery-enter, .gallery-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.gallery-leave-active {
  position: absolute;
}
</style>
