<template>
  <div class="sidebar">
    <div v-if="isOpen" class="sidebar-backdrop" @click="closeSidebarPanel" />
    <transition name="slide">
      <div v-if="isOpen" class="flex flex-col sidebar-panel">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  },
  methods: {
    closeSidebarPanel () {
      this.$emit('close')
    }
  }
}
</script>
<style>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
  }

  .sidebar-backdrop {
    background-color: rgba(19, 15, 64, .4);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 998;
  }

  .sidebar-panel {
    overflow-y: auto;
    background-color: rgba(24, 16, 37, 1);
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
  }
</style>
