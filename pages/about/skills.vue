<template>
  <div class="flex flex-col flex-auto -my-4">
    <h1 class="text-center py-4">
      Skills
    </h1>
    <div class="flex flex-auto -mx-4">
      <div class="flex flex-col flex-auto -my-2">
        <div class="flex justify-center items-center m-auto w-full max-w-lg py-2 relative">
          <div v-if="selectedCategory > 0" class="absolute left-0" @click="selectedCategory--">
            <font-awesome-icon icon="chevron-left" class="cursor-pointer" />
          </div>
          <strong class="text-xl">
            {{ shownCategory.name }}
          </strong>
          <div v-if="selectedCategory + 1 < categories.length" class="absolute right-0" @click="selectedCategory++">
            <font-awesome-icon icon="chevron-right" class="cursor-pointer" />
          </div>
        </div>
        <div class="flex justify-center -mx-4 py-2">
          <div v-for="(subcat, subindex) in shownCategory.subcategories" :key="subcat.name" class="px-4">
            <img :src="subcat.icon" :alt="subcat.name" class="icon cursor-pointer" @click="selectedSubcat = subindex">
          </div>
        </div>
        <div class="flex flex-col flex-auto items-center py-2 -my-2 text-center">
          <div class="py-2">
            <div>
              <strong class="text-lg">Overview</strong>
            </div>
            <div>
              {{ overview }}
            </div>
          </div>
          <div class="py-2">
            <div>
              <strong class="text-lg">Examples</strong>
            </div>
            <div>
              {{ examples }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'projection',
  asyncData ({ context }) {
    return require('@/assets/content/pages/about/skills.json')
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
    overview () {
      if (this.selectedSubcat < 0) {
        return ''
      }

      return this.categories[this.selectedCategory].subcategories[this.selectedSubcat].overview
    },
    examples () {
      if (this.selectedSubcat < 0) {
        return ''
      }

      return this.categories[this.selectedCategory].subcategories[this.selectedSubcat].examples
    }
  },
  mounted () {
    this.selectedCategory = 0
  }
}
</script>
