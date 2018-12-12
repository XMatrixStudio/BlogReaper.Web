import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import ReadLater from './components/ReadLater.vue'
import Today from './components/Today.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '/later',
        name: 'later',
        component: ReadLater
      }, {
        path: '/today',
        name: 'today',
        component: Today
      }]
    }
  ]
})
