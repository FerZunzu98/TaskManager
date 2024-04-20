<template>
  <div>
    <div>
      <div>
        <h2>Tarenas no completadas</h2>
        <div v-if="!isIncompletedEmpty">
          <Task v-for="task of incompleted" :key="task.id" :task="task" />
        </div>
        <div v-else>
          <Empty msg="Incompletas" />
        </div>
      </div>
      <div>
        <h2>Tareas completadas</h2>
        <div v-if="!isCompletedEmpty">
          <Task v-for="task of completed" :key="task.id" :task="task" />
        </div>
        <div v-else>
          <Empty msg="Completadas" />
        </div>
      </div>
      <div>
        <h2>Tareas de los últimos 7 días</h2>
        <div v-if="!isServerTasksEmpty">
          <Task v-for="task of serverTasks" :key="task.id" :task="task" />
        </div>
        <div v-else>
          <Empty msg="ultimos 7 dias" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Empty from "@/components/Empty.vue";
import Task from "@/components/Task.vue";

export default {
  name: "TaskList",
  components: {
    Empty,
    Task,
  },
  computed: {
    ...mapState(["tasks", "serverTasks"]),
    ...mapGetters(["completed", "incompleted"]),
    isServerTasksEmpty() {
      return this.serverTasks.length === 0;
    },
    isCompletedEmpty() {
      return this.completed.length === 0;
    },
    isIncompletedEmpty() {
      return this.incompleted.length === 0;
    },
  },
};
</script>

<style></style>
