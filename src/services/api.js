//Aqui voy a configurar las llamadas a la api
import axios from "axios";

const apiclient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return apiclient.get("/last_seven_days_completed_tasks/");
  },
  deleteTask(id) {
    return apiclient.delete(`/tasks/${id}`);
  },
  createTask(task) {
    return apiclient.post(`/tasks/`, task);
  },
  updateTask(task) {
    console.log(JSON.stringify(task));
    return apiclient.patch(`/tasks/${task.id}/`, JSON.stringify(task));
  },
  getAllTasks() {
    return apiclient.get("/tasks/");
  },
};
