<template>
  <nav>
    <router-link :to="{ name: 'home' }">Task List</router-link> |
    <router-link to="/newtask">New task</router-link>
  </nav>
  <!-- Aqui se renderizan las rutas -->
  <router-view />
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["loadFromServer", "loadIncompletedTasks"]),
  },
  mounted() {
    //Funciones para cargar la informacion al iniciar la página
    this.loadFromServer();
    this.loadIncompletedTasks();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
