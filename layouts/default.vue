<template>
  <div>
    <client-only>
      <div class="px-6 py-6">
        <slot />
      </div>
    </client-only>
  </div>
</template>

<script setup>
const state = reactive({
  clipped: false,
  drawer: true,
  fixed: true,
  items: [
    {
      icon: "mdi-apps",
      title: "Welcome",
      to: "/",
    },
    {
      icon: "mdi-chart-bubble",
      title: "Inspire",
      to: "/inspire",
    },
  ],
  miniVariant: false,
  right: true,
  rightDrawer: false,
  title: "Vuetify.js",
});

const openHandle = () => {
  state.drawer = !state.drawer;
};
// export default {
//   name: "DefaultLayout",
//   data() {
//     return {
//       clipped: false,
//       drawer: false,
//       fixed: false,
//       items: [
//         {
//           icon: "mdi-apps",
//           title: "Welcome",
//           to: "/",
//         },
//         {
//           icon: "mdi-chart-bubble",
//           title: "Inspire",
//           to: "/inspire",
//         },
//       ],
//       miniVariant: false,
//       right: true,
//       rightDrawer: false,
//       title: "Vuetify.js",
//     };
//   },
// };
</script>
<style lang="scss" scoped></style>
