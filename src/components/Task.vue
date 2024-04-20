<template>
  <div class="task_container">
    <p>Título: {{ task.title }}</p>
    <p>Descripción: {{ task.description }}</p>
    <p>Categoría: {{ task.category }}</p>
    <p>Fecha límite: {{ task.deadline }}</p>
    <div>
      <button v-if="!task.completed" @click="complete()">Completar</button>
      <button @click="delTask()">Eliminar</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    ...mapActions(["completeTask", "deleteTask"]),
    complete() {
      this.completeTask(this.task);
    },
    delTask() {
      this.deleteTask(this.task);
    },
  },
};
</script>

<style scoped>
.task_container {
  text-align: left;
  border: 1px solid black;
  width: 250px;
  border-radius: 10px;
  padding: 5px;
  background: aliceblue;
}
</style>
