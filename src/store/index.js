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
    LOAD_INCOMPLETED_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    COMPLETE_TASK(state, task) {
      const finded = state.tasks.find((element) => element.id == task.id);
      if (finded) {
        finded.completed = true;
      }
      state.serverTasks.push(finded);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    DELETE_TASK_FROM_SERVER(state, task) {
      if (task.completed) {
        state.serverTasks = state.serverTasks.filter(
          (element) => element.id !== task.id
        );
      } else {
        state.tasks = state.tasks.filter((element) => element.id !== task.id);
      }
    },
    DELETE_LOCAL_TASK(state, task) {
      state.tasks = state.tasks.filter((element) => element.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
  actions: {
    addTask({ commit }, task) {
      api.createTask(JSON.stringify(task)).then((response) => {
        task.id = response.data.id;

        commit("ADD_TASK", task);
      });
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
    completeTask({ commit }, task) {
      task.completed = true;

      api.updateTask(task).then((response) => {
        if (response.status === 200) {
          commit("COMPLETE_TASK", task);
        }
      });
    },
    deleteTask({ dispatch }, task) {
      if (task.fromServer) {
        dispatch("deleteTaskFromServer", task);
      } else {
        dispatch("deletelocalTask", task);
      }
    },
    deleteTaskFromServer({ commit }, task) {
      //Funcion para eliminar la task del servidor
      api.deleteTask(task.id).then((response) => {
        if (response.status === 204) {
          commit("DELETE_TASK_FROM_SERVER", task);
        }
      });
    },

    deletelocalTask({ commit }, task) {
      //Funcion para eliminar la task local
      commit("DELETE_LOCAL_TASK", task);
    },
  },
  modules: {},
});
