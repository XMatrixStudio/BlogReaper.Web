import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import { createProvider } from './vue-apollo'
import service from './service/service'

Vue.config.productionTip = false

Vue.use(service)

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
