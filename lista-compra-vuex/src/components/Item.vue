<template>
  <span>
    <strong>{{ nombre }}</strong>
    ({{ cantidad }} {{ unidades }})
    <button @click="delItem(id)">Eliminar</button>
  </span>
</template>

<script>
export default {
  name: "Item",
  props: ["id", "nombre", "cantidad", "unidades"],
  methods:{
      delItem: function(id){
          var idItem = id;
          console.log("IdProducto eliminado " + id)
          this.$store.commit("delItem", idItem);
      }
  }
};
</script>

<style>
</style>