import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);

Vue.config.productionTip = false

Vue.use(ElementUI);

export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')