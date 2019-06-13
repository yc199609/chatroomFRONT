import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './permission'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
