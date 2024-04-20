<template>
  <div>
    <p>No existen tareas registradas</p>
    <p v-if="msg">En la seccion:{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Empty",
  props: {
    msg: {
      required: false,
      type: String,
    },
  },
};
</script>

<style></style>
