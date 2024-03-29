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

  export const sortByUrgencyAndCompletion = (tasks: TASK[]) => {
  return tasks.sort((a, b) => {
    // Assuming `completed` is a boolean, invert its comparison to sort completed tasks last
    if (a.completed === b.completed) {
      // If completion is the same, sort by urgency (true comes before false)
      return (b.is_urgent === a.is_urgent) ? 0 : b.is_urgent ? -1 : 1;
    } else {
      // If one is completed and the other isn't, the uncompleted one should come first
      return a.completed ? 1 : -1;
    }
  })
}

</script>

<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { TASK, CAT } from '../api/apiSupabase';

  import { ref, onMounted } from 'vue';
  import useAuthUser from "../composables/UseAuthUser";
  import { useRouter } from "vue-router";
  import { fetchTable } from '../api/apiSupabase';

  import CategoriesArea from '../components/CategoriesArea.vue';
  import TasksArea from '../components/TasksArea.vue';

  const router = useRouter();

  onMounted(async () => {
    await onFetch('categories')
    await onFetch('tasks')
    if(tasks.value) {
      await sortByUrgencyAndCompletion(tasks.value)
    }
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
