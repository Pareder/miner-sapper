import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'

Vue.use(VueResource)

Vue.config.productionTip = false

const zeroTime = (val) => {
  return val > 9 ? val : '0' + val
}

Vue.prototype.formatTime = (val) => {
  const minutes = Math.floor(val / 60)
  const seconds = (val - minutes * 60).toFixed(2)
  return `${zeroTime(minutes)}:${zeroTime(seconds)}`
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
