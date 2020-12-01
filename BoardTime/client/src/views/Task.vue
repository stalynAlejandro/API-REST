<template>
  <div class="singletask-container">
    <strong>{{ nombre }}</strong>
    <div v-if="showDetails">
      <strong>: {{ desc }}</strong>
    </div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }"
    >
      <v-btn @click="onDetails" class="details-button">{{
        showDetails ? "Hide" : "Details"
      }}</v-btn>
      <v-btn @click="deleteTask" class="details-button">Delete</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["id", "nombre", "desc", "reloadData"],
  data: () => ({
    showDetails: false,
  }),
  methods: {
    onDetails() {
      this.showDetails = !this.showDetails;
    },
    deleteTask: async function () {
      console.log("Delete " + this.id);
      var resp = await fetch(
        `http://localhost:3000/${this.$store.state.email}/tasks/${this.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        }
      ).then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          return resp.json();
        } else {
          return undefined;
        }
      });

      if (resp) {
        this.reloadData();
      }
    },
  },
};
</script>

<style>
.singletask-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120%;
  width: 100%;
  background-color: burlywood;
  margin-top: 10px;
}
.details-button {
  border-width: 3px;
  border-radius: 5px;
  margin: 10px;
}
</style>