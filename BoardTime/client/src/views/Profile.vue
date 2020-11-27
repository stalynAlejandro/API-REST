<template>
  <div class="content-container">
    <div class="profile-dataContainer">
      <div class="data-container">
        <h2>Name:</h2>
        <h3 class="profile-data">{{ userName }}</h3>
      </div>
      <div class="data-container">
        <h2>Email: </h2>
        <h3 class="profile-data">{{ userEmail }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data:function(){
    return{};
  },
  computed: {
    userName: function () {
      return this.$store.state.name;
    },
    userEmail: function () {
      return this.$store.state.email;
    },
  },

};
</script>

<style>
.content-container {
  width: 100%;
  height: 560px;
  background-color: azure;
}

.profile-dataContainer{
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 50px;
}

.data-container{
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.profile-data{
  margin-left: 20px;
}

</style>