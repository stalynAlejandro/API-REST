<template>
  <div id="app">
    <div
      class="routing"
      v-if="this.$route.path === '/' || this.$route.path === '/login'"
    >
      <v-toolbar>
        <span class="hidden-sm-and-up"></span>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            {{ appTitle }}
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
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
      { title: "Log In", path: "/login", icon: "lock_open" },
    ],
  }),
};
</script>

<style>
#app {
  background: #8bd193;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>