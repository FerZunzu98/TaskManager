<template>
  <div>
    <div v-if="!isEmpty">
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
    </div>
    <div v-else>
      <Empty />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Empty from "@/components/Empty.vue";
import Task from "@/components/Task.vue";
import api from "@/services/api";

export default {
  name: "TaskList",
  components: {
    Empty,
    Task,
  },
  computed: {
    ...mapState(["tasks"]),
    ...mapGetters(["completed", "incompleted"]),
    isEmpty() {
      return this.tasks.length === 0;
    },
    isCompletedEmpty() {
      return this.completed.length === 0;
    },
    isIncompletedEmpty() {
      return this.incompleted.length === 0;
    },
  },
  mounted() {
    api.getTasks().then((tasks) => console.log(tasks));
  },
};
</script>

<style></style>
