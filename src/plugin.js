import VueListbox from './VueListbox.vue'

const VueListboxPlugin = {
  install (Vue) {
    Vue.component('vue-listbox', VueListbox)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueListboxPlugin)
}

export default VueListboxPlugin
