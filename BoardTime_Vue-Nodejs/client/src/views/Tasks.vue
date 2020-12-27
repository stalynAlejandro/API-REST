<template>
  <div class="content-container">
    <div class="task-container">
      
      <div class="tasklist-container">
        <h1>List Tasks</h1>
        <ul :style="{listStyleType: 'none'}">
          <li v-for="task in tasks" :key="task._id">
            <task :id="task._id" :nombre="task.name" :desc="task.desc" :reloadData="reloadData"/>
          </li>
        </ul>
      </div>

      <div class="form-container">
        <h5>New Task</h5>
        <input class="input-task" v-model="newTaskName" placeholder="Name" />
        <input
          class="input-task"
          v-model="newTaskDesc"
          placeholder="Description"
        />
        <button @click="addTask()" class="input-button">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Tasks",
  components: {
    Task,
  },
  data: () => ({
    newTaskName: "",
    newTaskDesc: "",
  }),
  computed: {
    tasks: function () {
      return this.$store.state.tasks;
    },
  },
  methods: {
    addTask: async function () {
      var resp = await fetch(
        `http://localhost:3000/${this.$store.state.email}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
          body: JSON.stringify({
            name: this.newTaskName.toUpperCase(),
            desc: this.newTaskDesc,
          }),
        }
      ).then((resp) => {
        if (resp.status === 200) return resp.json();
        else return undefined;
      });

      console.log(resp); // To-do Info Taks Created Ok
      this.newTaskName = "";
      this.newTaskDesc = "";
      this.reloadData();
    },
    reloadData: async function () {
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
        console.log(resp);
        if (resp.status === 200) {
          return resp.json();
        } else {
          return undefined;
        }
      });

      if (resp) {
        this.$store.commit("addTasks", resp.tasks);
      }
    },
  },
  mounted: function mounted() {
    this.reloadData();
  },
};
</script>

<style>
.task-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 50px;
}

.tasklist-container{
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: tomato;
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
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  background-color: thistle;
  height: 150px;
  width: 220px;
}
</style>