import Vue from 'vue'

// Simple function to turn a plural into a singular case
// Currently only works with words that end in an 's'.
Vue.filter('singularise', function (value) {
  if (!value) {
    return ''
  }

  value = value.toString()

  if (value.charAt(value.length - 1) !== 's') {
    return value
  }

  return value.substr(0, value.length - 1)
})
