<template>
  <div class="container">
    <p>Guardado {{ title }} de manera correcta.</p>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: {
    title: String,
  },
};
</script>

<style scoped></style>
