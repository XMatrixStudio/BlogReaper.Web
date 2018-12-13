import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    info: {
      name: '',
      avatar: '',
      gender: 0
    }
  },
  mutations: {
    login (state, data) {
      state.isLogin = true
      state.email = data.email
      state.info = data.info
    },
    logout (state) {
      state.isLogin = false
    }
  },
  actions: {}
})
