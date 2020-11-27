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
    },
    delUser(state){  
      state.name = '',
      state.email = '',
      state.token = '',
      state.tasks = []
    },
    addTasks(state, tasks){
      state.tasks = tasks
    }
  },
  actions: {
  },
  modules: {
  }
})
