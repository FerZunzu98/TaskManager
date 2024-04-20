<template>
  <div>
    <p>{{ task.title }}</p>
    <p>{{ task.description }}</p>
    <p>{{ task.category }}</p>
    <p>{{ task.date }}</p>
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

<style scoped></style>
