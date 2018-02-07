// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueFire from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueFire);
Vue.use(ElementUI);

// Import Components
const context = require.context('./components', true, /\.vue/);
context.keys().forEach((x) => {
  const component = context(x).default;
  if (component.name) {
    Vue.component(component.name, component);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
