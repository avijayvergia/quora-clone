import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { Firebase } from "../../middleware/firebase";

Vue.use(Router);

let router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = Firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('feeds')
  else next()
})

export default router