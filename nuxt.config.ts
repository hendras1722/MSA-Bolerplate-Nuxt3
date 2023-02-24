import vuetify from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: {
      eslint: {
        files: "./**/*.{ts,js,vue}",
      },
    },
  },
  // router: { middleware: ["nuxt-server-init"] },
  app: {
    head: {
      title: "MSA-Boilerplate",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: [
    "@/assets/main.scss",
    "vuetify/dist/vuetify.min.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    define: {
      "process.env.DEBUG": false,
    },
  },
  sourcemap: {
    server: false,
    client: false,
  },

  hooks: {
    "vite:extendConfig": (config: any) => {
      // settings css customizations
      config.plugins.push(
        vuetify({
          autoImport: true,
        })
      );
    },
  },
  plugins: [],
  modules: ["@nuxt-alt/proxy", "@pinia/nuxt"],
  proxy: {
    enableProxy: true,
    proxies: {
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      "^/dummy/.*": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummy/, ""),
      },
    },
    fetch: true,
  },
});
