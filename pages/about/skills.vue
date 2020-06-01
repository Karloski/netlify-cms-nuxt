<template>
  <div class="skills flex flex-col flex-auto -my-4 relative md:static">
    <div class="relative text-center py-4 md:static">
      <h1>
        Skills
      </h1>
    </div>
    <div class="flex flex-auto -mx-4">
      <div class="flex flex-col flex-auto -my-2 py-2">
        <div class="flex justify-center items-center m-auto w-full max-w-lg py-2 relative">
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
          <div v-for="(subcat, subindex) in shownCategory.subcategories" :key="subcat.name" class="p-4">
            <img :src="subcat.icon" :alt="subcat.name" :class="'icon-l cursor-pointer rounded-full' + (selectedSubcat === subindex ? ' skills-subcat-selected' : '')" @click="selectedSubcat = subindex">
          </div>
        </div>
        <div class="flex justify-center my-4">
          <div>
            <h4>Examples</h4>
          </div>
        </div>
        <div class="skills-examples flex flex-col flex-auto items-center justify-start py-2 -my-2 text-center">
          <transition-group v-if="examples.length > 0" name="list" tag="div" class="flex flex-wrap justify-center items-start -m-4">
            <div v-for="example in examples" :key="example.title" class="p-4 relative">
              <nuxt-link :to="`/projects/${example.slug}`">
                <img class="md:w-full max-w-xl" :src="example.images[0]" :alt="example.title">
                <img src="/img/search.svg" alt="Magnifying Glass" class="icon-l absolute absolute-center">
              </nuxt-link>
            </div>
          </transition-group>
          <div v-else>
            <h4>
              No examples found!
            </h4>
          </div>
        </div>
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
    a {
      img:first-child {
        transition: filter 700ms ease;
      }

      img:last-child {
        transition: opacity 1400ms ease;
        opacity: 0;
      }

      &:hover {
        img:last-child {
          opacity: 1;
        }

        img:first-child {
          filter: blur(5px);
        }
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

.list-leave-active {
  transition: all 500ms ease;
}

.list-enter-active {
  transition: all 500ms ease;
}

.list-enter {
  transform: translateY(500px);
}

.list-leave-to {
  transform: translateX(-500px);
}
</style>
