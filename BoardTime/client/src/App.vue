<template>
  <div id="app">
    <v-toolbar app>
      <span class="hidden-sm-and-up"></span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    appTitle: "BoardTime",
    sidebar: false,
    menuItems: [
      { title: "Home", path: "/", icon: "home" },
      { title: "Log In", path: "/login", icon: "face" },
      { title: "About", path: "/about", icon: "lock_open" },
    ],
  }),
};
</script>
