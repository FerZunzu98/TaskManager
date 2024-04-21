import { createStore } from "vuex";
import api from "@/services/api";

export default createStore({
  //Variables de estado
  state: {
    tasks: [],
    serverTasks: [],
  },
  getters: {
    //separo las tareas en completas e incompletas
    completed(state) {
      return state.tasks.filter((value) => value.completed);
    },
    incompleted(state) {
      return state.tasks.filter((value) => !value.completed);
    },
  },
  mutations: {
    //Esta parte debería hacerse en un fichero dedicado
    //pero dado que es muy poco código lo mantengo aquí
    //Añado la tarea al estate
    ADD_TASK(state, task) {
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    //Cargo las tareas completas de los últimos 7 dias en el state
    LOAD_TASKS_FROM_SERVER(state, tasks) {
      state.serverTasks = tasks;
    },
    //Cargo todas la tareas del servidor en el estate
    LOAD_INCOMPLETED_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    //Cambio el estado de la tarea para que los getters me la ubiquen de forma correcta
    COMPLETE_TASK(state, task) {
      const finded = state.tasks.find((element) => element.id == task.id);
      if (finded) {
        finded.completed = true;
      }
      state.serverTasks.push(finded);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    //Elimino la tarea del estate para que se vea en el cliente al momento
    DELETE_TASK_FROM_SERVER(state, task) {
      if (task.completed) {
        state.serverTasks = state.serverTasks.filter(
          (element) => element.id !== task.id
        );
      } else {
        state.tasks = state.tasks.filter((element) => element.id !== task.id);
      }
    },
  },
  actions: {
    //Guardo una tarea nueva en el servidor
    addTask({ commit }, task) {
      api.createTask(JSON.stringify(task)).then((response) => {
        task.id = response.data.id;

        commit("ADD_TASK", task);
      });
    },
    //Funcion que obtine las tareas completadas en los últimos 7 dias
    loadFromServer({ commit }) {
      api.getTasks().then((response) => {
        const tasks = response.data;

        const toSave = tasks.map((task) => {
          return {
            ...task,
            fromServer: true,
          };
        });

        commit("LOAD_TASKS_FROM_SERVER", toSave);
      });
    },
    //Cargo todas las tareas en el servidor
    //*implementar un endpoint para que me devuelva
    //solo las tareas sin completar
    loadIncompletedTasks({ commit }) {
      api.getAllTasks().then((response) => {
        const tasks = response.data;

        const toSave = tasks.map((task) => {
          return {
            ...task,
            fromServer: true,
          };
        });

        commit("LOAD_INCOMPLETED_TASKS", toSave);
      });
    },
    //Funcion para marcar como completa en el servidor una tarea
    completeTask({ commit }, task) {
      task.completed = true;

      api.updateTask(task).then((response) => {
        if (response.status === 200) {
          commit("COMPLETE_TASK", task);
        }
      });
    },
    //Funcion para eliminar la task del servidor
    deleteTaskFromServer({ commit }, task) {
      api.deleteTask(task.id).then((response) => {
        if (response.status === 204) {
          commit("DELETE_TASK_FROM_SERVER", task);
        }
      });
    },
  },
  modules: {},
});
