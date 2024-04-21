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
        class="input"
      />

      <label for="description">Descripción</label>
      <textarea
        id="description"
        v-model="description"
        required
        placeholder="Introduce la descripcion"
      ></textarea>

      <label for="category">Categoría</label>
      <select id="category" v-model="category" required>
        <option value="Personal">Personal</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Estudio">Estudio</option>
        <option value="Otros">Otros</option>
      </select>

      <label for="fecha">Fecha límite</label>
      <input
        id="fecha"
        type="datetime-local"
        :max="min"
        v-model="deadline"
        required
      />
      <div v-if="validateDate">
        <label>La fecha debe ser mayor a la actual</label>
      </div>
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
      deadline: null,
      saved: false,
      lastTask: "",
      min: new Date(),
    };
  },
  methods: {
    ...mapActions(["addTask"]),
    save() {
      const task = {
        title: this.title,
        description: this.description,
        category: this.category,
        deadline: this.deadline,
        completed: false,
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
        (this.deadline = null);
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

      const fechaIngresada = new Date(this.deadline).getTime();
      const fechaActual = new Date().getTime();

      if (fechaIngresada <= fechaActual) {
        return true;
      }

      return (
        !this.title || !this.description || !this.category || !this.deadline
      );
    },
    validateDate() {
      const fechaIngresada = new Date(this.deadline).getTime();
      const fechaActual = new Date().getTime();

      if (fechaIngresada <= fechaActual) {
        return true;
      }
      return false;
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
  justify-content: center;
  align-items: center;
  width: 30%;
  background-color: #e7e9eb;
  border-radius: 10px;
}
label {
  width: 20%;
  text-align: left;
  padding: 5px;
}

.buttons_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1rem;
}
textarea {
  width: 80%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

select {
  width: 80%;
  padding: 16px 20px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
}

input[type="text"] {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
input[type="datetime-local"] {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
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
