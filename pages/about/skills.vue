<template>
  <div class="skills flex flex-col flex-auto relative md:static">
    <div class="relative text-center py-4 md:static">
      <h1>
        Skills
      </h1>
    </div>
    <div class="flex flex-auto overflow-auto">
      <div class="flex flex-col flex-auto py-2">
        <div class="flex justify-center items-center mx-auto w-full max-w-lg py-2 relative">
          <select v-model="selectedCategory" @change="selectedSubcat = 0">
            <option v-for="(category, index) in catsWithExamples" :key="category.name" :value="index">
              {{ category.name | startCase | pluralize }}
            </option>
          </select>
        </div>
        <div class="skills-subcat flex flex-wrap justify-center py-2">
          <div v-for="(subcat, subindex) in subcatsWithExamples" :key="subcat.name" v-tooltip="subcat.name" class="m-4 bg-white rounded-full">
            <img :src="subcat.icon" :alt="subcat.name" :class="'icon-l cursor-pointer rounded-full' + (selectedSubcat === subindex ? ' skills-subcat-selected' : '')" @click="selectedSubcat = subindex">
          </div>
        </div>
        <transition name="fade">
          <div v-if="examples.length > 0" class="flex flex-auto flex-col overflow-auto my-4">
            <div class="flex justify-center my-2">
              <h4>Examples</h4>
            </div>
            <div class="skills-examples flex flex-col flex-auto items-center justify-start my-4 text-center overflow-auto">
              <transition-group name="gallery" tag="div" class="skills-examples-item flex flex-wrap flex-auto w-full justify-center content-start items-start">
                <div v-for="example in examples" :key="example.title" class="relative overflow-hidden h-full w-full max-w-xl m-4 transition-all duration-500 bg-cover bg-center rounded-lg" :style="`background-image: url(${example.carouselItems[0].images[0].source})`">
                  <div class="skills-examples-mask flex items-center justify-center w-full h-full absolute transform translate-y-full">
                    <nuxt-link :to="`/projects/${example.slug}`" class="px-6 py-4 bg-transparent border rounded-lg button">
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

    data.categories = (data.skills.reduce((carry, item) => {
      let obj = carry.find(a => a.name === item.type)

      if (!obj) {
        obj = {
          name: item.type,
          subcategories: []
        }

        carry.push(obj)
      }

      obj.subcategories.push(item)

      return carry
    }, []))

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
      return this.$store.state.projects.filter((p) => {
        return p.stack.includes(this.subcatName)
      })
    },
    catsWithExamples () {
      return this.categories.filter(c => c.subcategories.find(sc => this.$store.state.projects.find(p => p.stack.includes(sc.name))))
    },
    subcatsWithExamples () {
      return this.shownCategory.subcategories.filter(c => this.$store.state.projects.find(p => p.stack.includes(c.name)))
    }    
  },
  activated () {
    if ('name' in this.$router.currentRoute.query) {
      this.selectedCategory = this.categories.findIndex(c => c.subcategories.find(f => f.name.toLowerCase() === this.$router.currentRoute.query.name.toLowerCase()))

      if (this.selectedCategory === -1) {
        this.selectedCategory = 0
      } else {
        this.selectedSubcat = this.categories[this.selectedCategory].subcategories.findIndex(f => f.name.toLowerCase() === this.$router.currentRoute.query.name.toLowerCase())
      }
    }

    // console.log(this.shownCategory.subcategories, this.subcatsWithExamples)
  },
  methods: {
    move (to) {
      this.selectedCategory = to

      if (!(this.selectedSubcat in this.categories[this.selectedCategory].subcategories)) {
        this.selectedSubcat = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.skills {
  select {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid;
    border-radius: 0.5rem;
    color: #DBAB00;

    option {
      color: white;
      background: #3d275e;
    }
  }

  &-examples {
    &-item {
      > div {
        height: clamp(8rem, 50vw, 16rem);

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
