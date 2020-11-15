import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:'',
    email:'',
    toke: '',
    tasks:[]
  },
  mutations: {
    loginUser(state, user, token){
      state.name = user.name;
      state.email = user.email;
      state.token = token;
      state.tasks.pusht(user.tasks);
    }
  },
  actions: {
  },
  modules: {
  }
})
