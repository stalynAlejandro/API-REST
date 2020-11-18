<template>
  <div class="sideBar-container">
    <div class="sideBar-title">
      <img src="@/assets/logo.png" :style="{ width: '40px', height: '40px' }" />
      <h4>BoardTime</h4>
    </div>
    <hr
      :style="{
        borderTop: '1px solid #bbb',
        borderRadius: '2px',
        marginLeft: '10px',
        marginRight: '10px',
      }"
    />

    <div class="sideBar-options">
      <button @click={} class="sideBar-button">Perfil</button>
      <button @click={} class="sideBar-button">Tasks</button>
      <button @click={} class="sideBar-button">Stats</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNavBar",
};
</script>

<style>
.sideBar-container {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: #212120;
}
.sideBar-title {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  color: darkturquoise;
}

.sideBar-options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: aliceblue;
}

.sideBar-button{
  width: 80%;
  margin-top: 15px;
  background:darkslategrey;
  border-style: solid;
  border-radius: 5px;
}
</style>