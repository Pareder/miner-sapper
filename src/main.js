import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import { formatTime } from './helpers'

Vue.use(VueResource)

Vue.config.productionTip = false

Vue.prototype.formatTime = formatTime

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
