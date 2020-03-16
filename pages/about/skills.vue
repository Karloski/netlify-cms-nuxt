<template>
  <div class="flex flex-col flex-auto -my-4 relative">
    <div class="relative text-center py-4">
      <h1>
        Skills
      </h1>
      <div class="absolute categories flex flex-col items-end right-0 top-0">
        <div class="categories-icon flex flex-col items-center justify-center p-4">
          <div class="categories-segment pb-2">
            <div class="categories-segment-left">
              <div />
              <div />
            </div>
            <div class="categories-segment-right">
              <div />
              <div />
            </div>
          </div>
          <div class="categories-segment py-2">
            <div class="categories-segment-left">
              <div />
              <div />
            </div>
            <div class="categories-segment-right">
              <div />
              <div />
            </div>
          </div>
          <div class="categories-segment py-2">
            <div class="categories-segment-left">
              <div />
              <div />
            </div>
            <div class="categories-segment-right">
              <div />
              <div />
            </div>
          </div>
        </div>
        <div class="categories-menu p-4">
          <div v-for="page in aboutPages" :key="page" class="flex space-between items-center -mx-2 py-2 cursor-pointer">
            <span class="px-2">
              <img src="/img/php.svg" alt="" class="icon">
            </span>
            <h4 class="px-4 capitalize">
              {{ page }}
            </h4>
          </div>
        </div>
      </div>
    </div>
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
  async asyncData ({ context }) {
    const data = await require('@/assets/content/pages/about/skills.json')

    return {
      ...data,
      aboutPages: await require.context('@/assets/content/pages/about/', false, /\.json$/).keys().map(p => /\.\/(.*)\.json/.exec(p)[1])
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

<style lang="scss" scoped>
.categories {
  &-active {
    background: #181025;

    .categories-icon {
      border: 1px solid;
      border-bottom-color: #181025;
      border-radius: 1rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      z-index: 1;
    }

    .categories-menu {
      position: relative;
      top: -1px;
      border: 1px solid;
      border-radius: 1rem;
      border-top-right-radius: 0;
    }
  }

  &-segment {
    display: flex;
    justify-content: space-between;
    width: 50px;

    &-left {
      position: relative;
      width: 10px;

      :first-child {
        width: 10px;
        height: 10px;
        border: 2px solid;
        z-index: 1;
        position: absolute;
      }

      :last-child {
        width: 10px;
        height: 10px;
        border: 2px solid;
        color: #8e1014;
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        z-index: 0;
        filter: blur(2px);
      }
    }

    &-right {
      position: relative;
      width: 35px;

      :first-child {
        width: 35px;
        height: 10px;
        border: 2px solid;
        z-index: 1;
        position: absolute;
      }

      :last-child {
        width: 35px;
        height: 10px;
        border: 2px solid;
        color: #8e1014;
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        z-index: 0;
        filter: blur(2px);
      }
    }
  }
}
</style>