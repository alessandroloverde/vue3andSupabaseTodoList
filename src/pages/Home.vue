<script lang="ts">
  export const tasks: Ref<TASK[] | null> = ref([]);
  export const categories: Ref<CAT[] | null> = ref([]);

  /**
   * * Helper function for fetching Tasks or Categories.
   * @param tableType 
   */
  export const onFetch = async (tableType: string) => {
    alert(tableType)
    const data: (TASK[] | CAT[]) = await fetchTable(tableType) as (TASK[] | CAT[]);

    tableType === "tasks" ? tasks.value = data as TASK[] : categories.value = data as CAT[]
  }

  /**
   * * Function for sorting according to completion and urgency
   * @param tasks 
   */
  export const sortByUrgencyAndCompletion = (tasks) => {
    return tasks.sort((a, b) => {
      // Check for done tasks first
      if (a.completed === b.completed) {
        // If completion is the same, sort by urgency (false comes before true)
        return a.is_urgent - b.is_urgent;
      } else {
        // Completed tasks come first, regardless of urgency
        return a.completed ? 1 : -1;
      }
    })
  }
</script>

<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { TASK, CAT } from '../api/apiSupabase';

  import { ref, onMounted } from 'vue';
  import useAuthUser from "../composables/UseAuthUser"
  import { useRouter } from "vue-router";

  import CategoriesArea from '../components/CategoriesArea.vue';
  import TasksArea from '../components/TasksArea.vue';
  import { fetchTable } from '../api/apiSupabase';


  const router = useRouter();

  onMounted(async () => {
    await onFetch('categories')
    await onFetch('tasks')
    await sortByUrgencyAndCompletion(tasks)
  }) 
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
