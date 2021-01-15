export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "nuxt-playground",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: "/vuestagram",
          name: "Dashboard",
          component: resolve(__dirname, "pages/vuestagram/Dashboard.vue"),
        },
        {
          path: "/vuestagram/login",
          name: "Login",
          component: resolve(__dirname, "pages/vuestagram/Login.vue"),
        },
        {
          path: "/vuestagram/settings",
          name: "Settings",
          component: resolve(__dirname, "pages/vuestagram/Settings.vue"),
        }
      );
    },
  },
};
