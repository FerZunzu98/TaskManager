<template>
  <div>
    <div v-if="!isEmpty">
      {{ tasks }}
      <Task v-for="task of tasks" :key="task.id" />
    </div>
    <div v-else>
      <Empty />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "@/components/Empty.vue";
import Task from "@/components/Task.vue";

export default {
  name: "TaskList",
  components: {
    Empty,
    Task,
  },
  computed: {
    ...mapState(["tasks"]),
    isEmpty() {
      return this.tasks.length === 0;
    },
  },
};
</script>

<style></style>
