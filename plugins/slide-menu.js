import Vue from 'vue'
import * as slideMenu from 'vue-burger-menu'

for (const component in slideMenu) {
  Vue.component(component, slideMenu[component])
}
