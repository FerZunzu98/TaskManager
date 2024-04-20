//Aqui voy a configurar las llamadas a la api
import axios from "axios";

const apiclient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/tasks/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return apiclient.get("/");
  },
};
