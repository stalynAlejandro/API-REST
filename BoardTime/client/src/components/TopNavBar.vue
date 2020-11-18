<template>
  <div class="navBar-container">
    <button class="navBar-outButton" @click="logOut"><strong>Log Out</strong></button>
  </div>
</template>

<script>
export default {
  name: "TopNavBar",
  //   data: {},
  components: {},
  methods: {
    logOut: function () {
      this.$store.commit("delUser");
      this.$router.push({ path: "/" });
      console.log("Logout");
    },
  },
};
</script>

<style>
.navBar-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 10%;
  background-color: #f4f3ef;
}

.navBar-outButton {
  margin-top: 10px;
  border-width: 2px;
  margin-bottom: 10px;
  border-radius: 5px;
  margin-right: 10px;
  border-style: solid;
  border-color: darkslategrey;
  background-color: snow;
  font-size: medium;
}
</style>