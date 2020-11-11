<template>
  <div>
    <ul class="listaItems">
      <li v-for="item in lista" :key="item.id">
        <item
          :nombre="item.nombre"
          :cantidad="item.cantidad"
          :unidades="item.unidades"
          :id="item.id"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Item from "./Item";
export default {
  name: "ListaItems",
  components: {
    Item,
  },
  computed: {
    lista: function () {
      return this.$store.state.lista;
    },
  },
};
</script>

<style scoped>
.listaItems {
  text-align: left;
  margin-left: 10px;
}
</style>