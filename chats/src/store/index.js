import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import room from './modules/room'
import message from './modules/message'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules:{
    auth,
    room,
    message
  }
})
export default store;