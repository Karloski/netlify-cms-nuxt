import Vue from 'vue'

Vue.mixin({
  methods: {
    animateCss (node, animationName) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('Operation timed out')
        }, 2000)

        node.classList.add('animate__animated', animationName)

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
