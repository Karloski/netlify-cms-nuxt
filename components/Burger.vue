<template>
  <div :class="'burger'" @click="$emit('click')">
    <slot>
      <button class="burger-button cursor-pointer" title="Menu">
        <span class="burger-bar" />
        <span class="burger-bar" />
        <span class="burger-bar" />
      </button>
    </slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  },
  methods: {
    onBurgerClick () {
      console.log('Clicked!')
    }
  }
}
</script>

<style scoped lang="scss">
  .burger {
    &-button {
      position: relative;
      height: 32px;
      width: 32px;
      display: block;
      z-index: 999;
      border: 0;
      border-radius: 0;
      background-color: transparent;
      pointer-events: all;
    }

    &-bar {
      background-color: #DBAB00;
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      height: 4px;
      width: auto;
      margin-top: -1px;
      box-shadow: 5px 5px 5px #9B1111;

      &:hover {
        &:nth-child(2) {
          transform: scaleX(1);
        }
      }

      &:nth-child(1) {
        transform: translateY(-10px);
      }

      &:nth-child(3) {
        transform: translateY(10px);
      }
    }

    &-active {
      .burger-button {
        transform: rotate(-180deg);
      }

      .burger-bar {
        &:nth-child(1) {
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg);
        }
      }
    }
  }
</style>
