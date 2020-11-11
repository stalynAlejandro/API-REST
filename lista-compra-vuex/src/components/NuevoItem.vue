<template>
  <div>
    <input type="text" v-model="nombre" placeholder="Nombre..." />
    <input
      type="number"
      v-model="cantidad"
      placeholder="Cant..."
      min="1"
      max="999"
    />
    <select size="1" v-model="unidades">
      <option v-for="u in listaUnidades" :key="u">{{ u }}</option>
    </select>
    <button @click="addItem">Añadir</button>
  </div>
</template>

<script>
import Unidades  from "../util/Unidades";

export default {
  name: "NuevoItem",
  data: function () {
    return {
      nombre: "",
      cantidad: 1,
      unidades: Unidades.KG,
    };
  },
  created: function () {
    this.listaUnidades = Unidades;
  },
  methods: {
    addItem: function () {
      var nuevo = {
        nombre: this.nombre,
        cantidad: this.cantidad,
        unidades: this.unidades,
      };
      console.log(nuevo);
      this.$store.commit("addItem", nuevo);
    },
  },
};
</script>

<style scoped>
input[type="number"] {
  width: 3em;
}
</style>
