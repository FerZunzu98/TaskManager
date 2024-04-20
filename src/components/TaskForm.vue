<template>
  <div class="container">
    <h3>Formulario</h3>
    <div class="form_container">
      <label for="title">Titulo</label>
      <input
        id="title"
        type="text"
        placeholder="Título"
        v-model="title"
        required
      />

      <label for="description">Descripción</label>
      <textarea id="description" v-model="description" required>
Introduce la descripción de la tarea</textarea
      >

      <label for="category">Categoría</label>
      <select id="category" v-model="category" required>
        <option value="Personal">Personal</option>
        <option value="Trabajo" selected>Trabajo</option>
        <option value="Estudio">Estudio</option>
        <option value="Otros">Otros</option>
      </select>

      <label for="fecha">Fecha límite</label>
      <input id="fecha" type="datetime-local" v-model="date" required />
      <div class="buttons_container">
        <button @click="clean()" class="btn cancel">Cancelar</button>
        <button @click="save()" :disabled="isDisabled" class="btn save">
          Guardar
        </button>
      </div>
    </div>
    <Success :title="lastTask" v-if="saved" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Success from "@/components/Success.vue";
export default {
  name: "TaskForm",
  components: {
    Success,
  },
  data() {
    return {
      title: "",
      description: "",
      category: "",
      date: null,
      saved: false,
      lastTask: "",
    };
  },
  methods: {
    ...mapActions(["addTask"]),
    save() {
      const task = {
        title: this.title,
        description: this.description,
        category: this.category,
        date: this.date,
      };

      this.addTask(task);
      this.lastTask = task.title;
      this.saved = true;
      this.clean();
    },
    clean() {
      (this.title = ""),
        (this.description = ""),
        (this.category = ""),
        (this.date = null);
    },
  },
  computed: {
    isDisabled() {
      //Aquí realizo las validaciones de que la información
      //pasada en el formulario sea correcta
      if (this.title.length < 5) {
        return true;
      }

      if (this.description.length < 10) {
        return true;
      }

      return !this.title || !this.description || !this.category || !this.date;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form_container {
  display: flex;
  flex-direction: column;
  width: 40%;
}
label {
  width: 20%;
  text-align: left;
}

.buttons_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1rem;
}

.btn {
  border: none;
  color: white;
  padding: 14px 28px;
  cursor: pointer;
  border-radius: 5px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: no-drop;
}

.save {
  background-color: #04aa6d;
}
.save:hover:active {
  background-color: #46a049;
}

.cancel {
  background-color: #f44336;
}
.cancel:hover {
  background: #da190b;
}
</style>
