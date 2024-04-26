<script lang="ts">
  export const tasks: Ref<TASK[] | null> = ref([]);
  export const categories: Ref<CAT[] | null> = ref([]);


  /**
   * * Helper function for fetching Tasks or Categories.
   * @param tableType 
   */
  export const onFetch = async (tableType: string) => {
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
  import Login from './Login.vue';
  import Register from './Register.vue';
  import AppFooter from '../components/AppFooter.vue';

  const router = useRouter();

  const {isLoggedIn} = useAuthUser();

  onMounted(async () => {
    await onFetch('categories')
    await onFetch('tasks')
    
    if(tasks.value) {
      await sortByUrgencyAndCompletion(tasks.value)
    }
  }) 
</script>

<template>
  <div v-if="!isLoggedIn()" class="homePage">
    <section class="homePage--intro">
      <div class="container">
        <div class="homePage--intro--logo">
          <img src="../assets/images/LogoWithTagline.png" class="responsiveImg" alt="logo">
        </div>
        <div class="homePage--intro--jumpTo">
          <a href="#login&register">
            <button class="iconOnly btn--icn--icon-chevron-circle-down" role="button" aria-label="Next Page"></button>
          </a>
        </div>
      </div>
    </section>
    <section class="homePage--cta" id="login&register">
      <div class="container">
        <div class="homePage--cta--card">
          <div class="homePage--cta--card--text col-sm-3">
            <h1>Why Wondertask?</h1>
            <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
            <p>Second line with some instructions on how to use.</p>
            <p>Wondertask is a simple and easy-to-use Todo List that allows you to add tasks, set priorities, and mark tasks as completed.</p>
            <p>Second line with some instructions on how to use.</p>
          </div>
          <div class="homePage--cta--card--image col-sm-2">
            <img src="../assets/images/Cards-stack.png" class="responsiveImg" alt="Task List">
          </div>
        </div>
        <div class="homePage--cta--authentication">
          <div class="container">
            <Login></Login>
            <Register></Register>
          </div>
        </div>
      </div>
    </section>
    <AppFooter></AppFooter>
  </div>
  <div v-else class="todoListApp">
    <CategoriesArea 
      :categories="categories" 
      :tasks="tasks" 
      @categoryUpdated="onFetch('categories')">
    </CategoriesArea>
    <TasksArea 
      :categories="categories" 
      :tasks="tasks" 
      @taskUpdated="onFetch('tasks')">
    </TasksArea>
  </div>
</template>
