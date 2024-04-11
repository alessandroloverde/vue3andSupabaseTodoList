import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "../composables/UseAuthUser";


const routes = [
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("../pages/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("../pages/Home.vue"),
  },
  {
    name: "Me",
    path: "/me",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../pages/Me.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: () => import("../pages/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    /**
     * * Route guard that logs out the user and redirects them to the Home page.
     * @return {Object} An object with a name property set to "Home".
     */
    beforeEnter: async () => {
      const { logout } = useAuthUser();

      await logout();

      return { name: "Home" };
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("../pages/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const originalRequiresAuth = to.meta.requiresAuth

  console.log('isLoggedIn', isLoggedIn())
  console.log('requiresAuth', requiresAuth)
  console.log('originalRequiresAuth', originalRequiresAuth)
  console.log('query', Object.keys(to.query))

  if ( !isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes("fromEmail") ) {
    return { name: "Home" };
  }
});

export default router;
