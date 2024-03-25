<script setup>
  import useAuthUser from "../composables/UseAuthUser"
  import { useRouter } from "vue-router";

  import CategoriesArea from '../components/CategoriesArea.vue';
  import TasksArea from '../components/TasksArea.vue';

  import { categories } from '../components/CategoriesArea.vue';
  import { tasks } from '../components/TasksArea.vue';

  import { onFetch } from "../App.vue";

  const router = useRouter();


</script>

<template>
    <CategoriesArea
      :categories="categories"
      :tasks="tasks"
      @categoryUpdated="onFetch('categories')"
  ></CategoriesArea>
  <TasksArea
      :categories="categories"
      :tasks="tasks"
      @taskUpdated="onFetch('tasks')"
  ></TasksArea>
</template>
