//import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ["@urql/vue"],
  },
  css: ["~/assets/css/main.css"],
  //vite: {
  //plugins: [tailwindcss()],
  //},
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.PRODUCTION ? "https://example.com" : "http://localhost:1323",
    },
  },
  modules: ["@vueuse/nuxt"],
});
