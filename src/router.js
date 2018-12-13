import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import ReadLater from './views/Home/ReadLater.vue'
import Today from './views/Home/Today.vue'
import Add from './views/Home/Add.vue'
import Manger from './views/Home/Manger.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: '/manger',
        name: 'manger',
        component: Manger
      }, {
        path: '/add',
        name: 'add',
        component: Add
      }, {
        path: '/later',
        name: 'later',
        component: ReadLater
      }, {
        path: '',
        name: 'home',
        component: Today
      }]
    }
  ]
})
