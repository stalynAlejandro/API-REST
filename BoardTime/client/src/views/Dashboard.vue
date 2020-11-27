<template>
  <div class="dash-container">
    <SideNavBar :option="displayScreen" :setOption="setOption" />
    <div class="dash-content">
      <TopNavBar />
      <div v-if="displayScreen === 'Tasks'">
        <Tasks />
      </div>
      <div v-else>
        <Profile />
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "@/components/TopNavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";
import Tasks from "@/views/Tasks.vue";
import Profile from "@/views/Profile.vue";

export default {
  name: "Dasboard",
  components: {
    TopNavBar,
    SideNavBar,
    Tasks,
    Profile,
  },
  data: function () {
    return {
      displayScreen: "Profile",
    };
  },
  methods: {
    setOption: function (op) {
      this.displayScreen = op;
    },
  },
};
</script>

<style>
.dash-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.dash-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>