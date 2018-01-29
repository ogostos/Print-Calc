// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {store} from './store/store'
import './css/input.css'
import './css/cmyk.css'

Vue.config.productionTip = false

Vue.filter('split', (n) => {
  let res = ''
  while (n) {
    let a = n % 1000
    n = Math.floor(n / 1000)
    res = (n ? '0'.repeat(3 - a.toString().length) : '') + a + ' ' + res
  }
  return res
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
