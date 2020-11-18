<template>
  <div class="dash-container">
    <SideNavBar />
    <div class="dash-content">
      <TopNavBar />
      <Tasks />

    </div>
  </div>
</template>

<script>
import TopNavBar from "@/components/TopNavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";
import Tasks from '@/views/Tasks.vue'

export default {
  name: "Dasboard",
  components: {
    TopNavBar,
    SideNavBar,
    Tasks,
  },
  methods: {},
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
.dash-content{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>