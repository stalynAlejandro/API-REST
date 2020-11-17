<template>
  <div class="container">
    <SideNavBar />
    <TopNavBar />
  </div>
</template>

<script>
import TopNavBar from "@/components/TopNavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";

export default {
  name: "DasboardLayout",
  components: {
    TopNavBar,
    SideNavBar,
  },
  methods: {},
};
</script>

<style>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>