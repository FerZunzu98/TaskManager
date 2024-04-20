<template>
  <div>
    <TaskForm />
  </div>
</template>

<script>
// @ is an alias to /src
import TaskForm from "@/components/TaskForm.vue";

export default {
  name: "TaskView",
  components: {
    TaskForm,
  },
};
</script>
