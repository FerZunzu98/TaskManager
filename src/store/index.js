import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
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
  },
  actions: {
    addTask({ commit }, task) {
      commit("ADD_TASK", task);
    },
    loadTaskFromLocalStorage({ commit }) {
      commit("LOAD_TASKS_FROM_LOCALSTORAGE");
    },
  },
  modules: {},
});
