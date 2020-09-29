import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'spin.js/spin.css';
import * as Settings from './settings';
import interceptor from './helpers/httpInterceptor.js';
interceptor();

Vue.config.productionTip = false;
axios.defaults.baseURL = Settings.API_BASE_URL;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
