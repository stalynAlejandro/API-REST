<template>
  <div class="content-container">
    <div class="task-container">
      <h1>List Tasks</h1>
      <h6>Tarea 1</h6>
      <h6>Tarea 1</h6>
      <h6>Tarea 1</h6>
      <div>
        <input class="input-task" v-model="newTaskName" />
        <button @click="addTask()" class="input-button">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
  data: function () {
    return {
      newTaskName: "",
    };
  },
  computed: {
    tasks: function () {
      return this.$store.state.tasks;
    },
  },
  methods: {
    addTask: function () {
      console.log(this.newTaskName);
      this.newTaskName = "";
    },
  },
  mounted: async function () {
    console.log("mounted");
    var resp = await fetch(
      `http://localhost:3000/${this.$store.state.email}/tasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      }
    ).then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      } else {
        return undefined;
      }
    });
    if (resp) {
      this.$store.commit("addTasks", resp);
    }
  },
};
</script>

<style>
.task-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 50px;
}

.input-task {
  background-color: darkgray;
  width: 200px;
}

.input-button {
  background-color: teal;
  margin-left: 5px;
  border-width: 3px;
  border-radius: 5px;
  border-color: darkred;
  width: 50px;
}
</style>