<template>
  <div>
    <client-only>
      <v-app>
        <!-- style="background-color: rgb(19 101 183)" -->
        <v-navigation-drawer
          dark
          :permanent="sm ? false : true"
          app
          style="color: white"
        >
          <v-list>
            <v-list-item
              v-for="(item, i) in state.items"
              :key="i"
              :to="item.to"
              nuxt
              exact
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-app-bar
          style="background-color: rgb(19 101 183)"
          :order="-1"
          dark
          elevation="3"
          class="headers"
        >
          <v-btn icon="mdi-heart" color="primary" @click="openHandle"></v-btn>
          <v-toolbar-title v-text="'CashSirApp'" />
          <v-spacer />
        </v-app-bar>

        <v-main class="posapp">
          <div class="px-6 py-6">
            <v-card class="px-3 py-3">
              <slot />
            </v-card>
          </div>
        </v-main>
      </v-app>
    </client-only>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { sm } = useDisplay();

const state = reactive({
  clipped: false,
  drawer: true,
  fixed: true,
  items: [
    {
      icon: "mdi-apps",
      title: "Welcome",
      to: "/admin",
    },
    {
      icon: "mdi-chart-bubble",
      title: "Inspire",
      to: "/admin/inspire",
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
