import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import { Firebase, userRef } from "../../middleware/firebase";
import store from "../../store/index";

Vue.use(Router);

let router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  let currentUser = Firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("login");
  } else if (!requiresAuth) {
    next();
  } else {
    if (store.state.userId.length === 0) {
      userRef.child(currentUser.uid).on("value", snapshot => {
        store.commit("setUser", { data: snapshot.val(), uid: currentUser.uid });
        next();
      });
    } else {
      next();
    }
  }
});

export default router;
