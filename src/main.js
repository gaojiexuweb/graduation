import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Loading} from 'element-ui';
import axios from 'axios'
import qs from "qs"
// import axios from './http.js'
import dataService from './api/dataService.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'jquery'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css";
Vue.config.productionTip = false
Vue.use(ElementUI);

axios.default.withCredentials = true
Vue.prototype.axios = axios
Vue.prototype.$http = dataService
Vue.prototype.$loading = Loading
Vue.prototype.qs = qs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
