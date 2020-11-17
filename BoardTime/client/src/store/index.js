import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:'',
    email:'',
    token: '',
    tasks:[]
  },
  mutations: {
    addUser(state, user){
      state.name = user.name;
      state.email = user.email;
      state.token = user.token;
    }
  },
  actions: {
  },
  modules: {
  }
})
