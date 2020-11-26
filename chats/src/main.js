import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  store from "./store/index.js";
import axios from 'axios'
import Notifications from 'vue-notification'
import VueAWN from "vue-awesome-notifications"
import Http from "./http"
// axios.defaults.baseURL = "http://localhost:3000/";
let http = new Http()
require('./vee-validate/validate.js')
require('./assets/css/main.css');
require('./assets/css/util.css');
require('./assets/vendor/bootstrap/css/bootstrap.min.css');
require('./assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
require('./assets/fonts/iconic/css/material-design-iconic-font.min.css');
require('./assets/vendor/animate/animate.css');
require('./assets/vendor/css-hamburgers/hamburgers.min.css');
require('./assets/vendor/animsition/css/animsition.min.css');
require('./assets/vendor/select2/select2.min.css');
require('./assets/vendor/daterangepicker/daterangepicker.css');
require("./assets/css/style.scss")
// require("./assets/js/index.var.js")

import snotify from './assets/js/index.var.js';

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueAWN)
// Vue.mixin(snotify);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
