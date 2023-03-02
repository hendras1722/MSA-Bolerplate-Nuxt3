import { DetailAPI } from "../api/detail";
export default defineNuxtPlugin(async (nuxtApp) => {
  return {
    provide: {
      DetailAPI,
    },
  };
});
