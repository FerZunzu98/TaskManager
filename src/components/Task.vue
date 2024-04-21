<template>
  <div class="task_container">
    <p><b>Título:</b> {{ task.title }}</p>
    <p><b>Descripción:</b> {{ task.description }}</p>
    <p><b>Categoría:</b> {{ task.category }}</p>
    <p><b>Fecha límite:</b> {{ task.deadline.split("T")[0] }}</p>
    <p><b>Hora límite:</b> {{ task.deadline.split("T")[1].slice(0, 5) }}</p>
    <div class="btns_div">
      <button v-if="!task.completed" @click="complete()" class="btn_complete">
        Completar
      </button>
      <button @click="delTask()" class="btn_delete">Eliminar</button>
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
    ...mapActions(["completeTask", "deleteTaskFromServer"]),
    //Funciones botones, para marcar como completo y eliminar
    complete() {
      this.completeTask(this.task);
    },
    delTask() {
      this.deleteTaskFromServer(this.task);
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
  margin-left: 10px;
  margin-top: 10px;
  word-break: break-word;
  line-break: normal;
  hyphens: auto;
  overflow-wrap: break-word;
}

.btn_complete {
  background-color: #0095ff;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 250;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
  margin-right: 10px;
}

.btn_complete:hover,
.btn_complete:focus {
  background-color: #07c;
}

.btn_complete:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.btn_complete:active {
  background-color: #0064bd;
  box-shadow: none;
}

.btn_delete {
  background-color: rgb(255, 0, 0);
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
    sans-serif;
  font-size: 13px;
  font-weight: 250;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn_delete:hover,
.btn_delete:focus {
  background-color: rgb(182, 11, 11);
}

.btn_delete:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.btn_delete:active {
  background-color: rgb(161, 2, 2);
  box-shadow: none;
}
</style>
