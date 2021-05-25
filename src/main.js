import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

Vue.use(Router);

Vue.config.productionTip = false

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
