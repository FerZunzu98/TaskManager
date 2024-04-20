<template>
  <div class="task_container">
    <p>Título: {{ task.title }}</p>
    <p>Descripción: {{ task.description }}</p>
    <p>Categoría: {{ task.category }}</p>
    <p>Fecha límite: {{ task.date }}</p>
    <div>
      <button>Modificar</button>
      <button>Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
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
