<template>
  <div id="app">
    <img width="25%" src="../assets/logo.png" />
    <nuevoItem />
    <listaItems />
  </div>
</template>

<script>
import ListaItems from "./ListaItems";
import NuevoItem from "./NuevoItem";

export default {
  name: "App",
  components: {
      ListaItems,
      NuevoItem
  },
};
</script>

<style>
#app {
  font-family: "Nunito", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
