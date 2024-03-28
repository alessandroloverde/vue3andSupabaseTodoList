<script setup>
  import useAuthUser from "../composables/UseAuthUser"
  import { useRouter } from "vue-router";
  import { ref, onMounted } from 'vue';


  import CategoriesArea from '../components/CategoriesArea.vue';
  import TasksArea from '../components/TasksArea.vue';

  import { categories } from '../App.vue';
  import { tasks } from '../App.vue';
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
