import { createStore } from "vuex";
import api from "@/services/api";

export default createStore({
  state: {
    tasks: [],
    serverTasks: [],
  },
  getters: {
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
    ADD_TASK(state, task) {
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    LOAD_TASKS_FROM_LOCALSTORAGE(state) {
      const localTasks = localStorage.getItem("tasks");

      if (localTasks !== null) {
        const tasks = JSON.parse(localTasks);
        state.tasks = tasks;
      } else {
        state.tasks = [];
      }
    },
    LOAD_TASKS_FROM_SERVER(state, tasks) {
      state.serverTasks = tasks;
    },
    COMPLETE_TASK(state, task) {
      const finded = state.tasks.find((element) => element.id == task.id);
      if (finded) {
        finded.completed = true;
      }
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("ADD_TASK", task);
    },
    loadTaskFromLocalStorage({ commit }) {
      commit("LOAD_TASKS_FROM_LOCALSTORAGE");
    },
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
    completeTask({ commit }, task) {
      commit("COMPLETE_TASK", task);
    },
    deleteTask({ dispatch }, task) {
      if (task.fromServer) {
        dispatch("deleteTaskFromServer", task);
      } else {
        dispatch("deletelocalTask", task);
      }
    },
    // deleteTaskFromServer({commit},task){
    //   //Funcion para eliminar la task del servidor
    // },
    // deletelocalTask({commit},task){
    //   //Funcion para eliminar la task local

    // },
  },
  modules: {},
});
