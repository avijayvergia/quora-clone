// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './middleware/router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueFire from 'vuefire'
import { Firebase } from "./middleware/firebase";
import store from './store/index';
import Time from './middleware/time';

Vue.config.productionTip = false;
let app;
Vue.use(VueFire);
Vue.use(ElementUI);
Vue.use(Time);

Firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
    });
  }
});


