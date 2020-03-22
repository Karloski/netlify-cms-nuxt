<template>
  <div :class="'categories flex flex-col items-end' + (showMenu ? ' categories-active' : '')">
    <div class="categories-icon flex flex-col items-center justify-center cursor-pointer p-4" @click="showMenu = !showMenu">
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
    <div v-if="showMenu" class="categories-menu p-4">
      <nuxt-link v-for="item in menu" :key="item.name" :to="`${item.link}`" class="flex space-between items-center -mx-2 py-2">
        <span class="px-2">
          <img :src="item.icon" :alt="item.name" class="icon">
        </span>
        <h4 class="px-4 capitalize">
          {{ item.name }}
        </h4>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>

<style lang="scss" scoped>
.categories {
  &-active {
    .categories-icon {
      border: 1px solid;
      border-bottom-color: #181025;
      border-radius: 1rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      z-index: 1;
      background: #181025;
    }

    .categories-menu {
      position: relative;
      top: -1px;
      border: 1px solid;
      border-radius: 1rem;
      border-top-right-radius: 0;
      background: #181025;
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
