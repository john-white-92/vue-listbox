import Vue from 'vue'
import App from './App.vue'
import VueListbox from '../src/VueListbox.vue'
import ItemTest1 from './components/ItemTest1.vue'
import ItemTest2 from './components/ItemTest2.vue'

Vue.component('vue-listbox', VueListbox)
Vue.component('item-test-1', ItemTest1)
Vue.component('item-test-2', ItemTest2)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
