<template>
  <div>
    <div>
      <section>
        <div>
          <h2>Tarenas no completadas</h2>
          <div v-if="!isIncompletedEmpty" class="completed_tasks">
            <Task v-for="task of incompleted" :key="task.id" :task="task" />
          </div>
          <div v-else>
            <Empty msg="Incompletas" />
          </div>
        </div>
      </section>
      <section>
        <h2>Tareas completas de los últimos 7 días</h2>
        <div v-if="!isServerTasksEmpty" class="completed_tasks">
          <Task v-for="task of serverTasks" :key="task.id" :task="task" />
        </div>
        <div v-else>
          <Empty msg="ultimos 7 dias" />
        </div>
      </section>
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
    //Compruevo si hay tareas para cargar el componente Empty
    isServerTasksEmpty() {
      return this.serverTasks.length === 0;
    },
    isIncompletedEmpty() {
      return this.incompleted.length === 0;
    },
  },
};
</script>

<style>
.completed_tasks {
  display: flex;
  flex-wrap: wrap;
}
</style>
