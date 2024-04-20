import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
  },
  getters: {},
  mutations: {
    //Esta parte debería hacerse en un fichero dedicado
    //pero dado que es muy poco código lo mantengo aquí
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("ADD_TASK", task);
    },
  },
  modules: {},
});
