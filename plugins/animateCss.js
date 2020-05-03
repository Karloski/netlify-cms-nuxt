import Vue from 'vue'

Vue.mixin({
  methods: {
    animateCss (node, animationName) {
      return new Promise((resolve, reject) => {
        node.classList.add('animated', animationName)

        function handleAnimationEnd () {
          node.classList.remove('animated', animationName)
          node.removeEventListener('animationend', handleAnimationEnd)

          resolve()
        }

        node.addEventListener('animationend', handleAnimationEnd)
      })
    }
  }
})
