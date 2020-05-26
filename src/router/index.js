import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SortedTodos from "../views/SortedTodos.vue";
import addCategory from "../views/addCategory.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/sorted/:category",
    name: "sorted",
    component: SortedTodos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addcategory",
    name: "addcategory",
    component: addCategory,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
