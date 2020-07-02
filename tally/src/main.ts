import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nve from '@/components/Nve.vue';

Vue.config.productionTip = false

Vue.component('Nve', Nve)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
