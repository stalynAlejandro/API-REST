<template>
  <div class="home">
    <h1>Create your tasks with BoardTime</h1>
    <div class="home-info">
      <div>
      <p class="home-paragraph">
        Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list (no matter where you are or what device you use)..
      </p>
      <v-btn @click="startNow" :style="{ marginTop: '10px', marginRight:'10px' }">Start Now</v-btn>
      </div>
      <img src="@/assets/portada.png" alt="--" width= "700" />
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    startNow(){
      this.$router.push({name:'login'});
    }
  }
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  height: 600px;
  width: "100%";
}
.home-info {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: "100%";
}
.home-paragraph {
  width: 200px;
  margin-right: 60px;
}
</style>
