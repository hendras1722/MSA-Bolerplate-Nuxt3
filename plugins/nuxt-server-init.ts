export default defineNuxtPlugin(async (nuxtApp) => {
  if (!process.server) return;
  try {
    const res = await $fetch("https://dummyjson.com/products/1");
    console.log(res, "iniwe");
  } catch (error) {
    console.log(error, "inierror");
  }
});
