import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueRouter);

// Register routes
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  store,
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
