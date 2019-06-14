import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './permission'

console.log(process.env.VUE_APP_BASE_API)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
