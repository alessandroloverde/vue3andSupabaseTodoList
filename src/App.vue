<template>
    <AppHeader></AppHeader>
    <main>
        <div class="appContainer">

            <CategoriesArea
                :categories="categories"
                :tasks="tasks"
                :supabase="supabase"
                @categoryUpdated="onFetch('categories')"
            ></CategoriesArea>
            <TasksArea
                :categories="categories"
                :tasks="tasks"
                :supabase="supabase"
                @taskUpdated="onFetch('tasks')"
            ></TasksArea>
        </div>
    </main>
</template>
<!-- <script lang="ts">
    export const tasks: Ref<TASK[] | null> = ref([]);
    export const categories: Ref<CAT[] | null> = ref([]);
</script> -->
<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { TASK, CAT } from './api/apiSupabase';

    import { ref, reactive, onMounted, computed } from 'vue';
    import { createClient } from '@supabase/supabase-js';
    import { fetchTable, S_saveData } from './api/apiSupabase';

    import AppHeader from './components/AppHeader.vue';
    import CategoriesArea from './components/CategoriesArea.vue';
    import TasksArea from './components/TasksArea.vue';
   
    const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    const categoryName: Ref<CAT["name"]> = ref('');
    const newTodo = ref(null);

    const tasks: Ref<TASK[] | null> = ref([]);
    const categories: Ref<CAT[] | null> = ref([]);

    let editingTask: boolean[] = reactive([])
    let tempEditName = reactive(Array(categories.value?.length).fill(''))
    let authStatus: Ref<string> = ref('')



    /**
     * * Auth - login
     */ 
    const myAuth = {
        login: {
            email: ref(''),
            password: ref(''),
            displayName: ref('')
        },
        register: {
            email: ref(''),
            password: ref(''),
            displayName: ref('')            
        },
        user: ref(''),
        userID: ref<string>('')
    }
    

    const login = async () => {  
        const { data, error } = await supabase.auth.signInWithPassword({
            email: myAuth.login.email.value,
            password: myAuth.login.password.value
        });

        if (error) {
            console.error('Login fallito. Error logging in:', error.message, data);
            
            authStatus.value = "not logged";
        } else {
            console.log('Successo. User logged in:', data.user); 

            authStatus.value = data.user.role ?? 'not logged'
            myAuth.userID.value = data.user.id

            fetchTable('tasks')
        }
    }
    const register = async () => {   
        const {data, error } = await supabase.auth.signUp({
            email: myAuth.register.email.value,
            password: myAuth.register.password.value
        })

        if (error) console.error('Registrazione fallita. Error logging in:', error.message);
        else console.log('Successo. User registed:', data.user);
    }
    /* ----------------------------------------------------------------------------------------------------------- */


    /**
     * * Function for sorting according to completion and urgency
     * @param tasks 
     */
    const sortByUrgencyAndCompletion = (tasks) => {
        return tasks.value.sort((a, b) => {
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


    // === Async functions ================================================================================================
    /**
     * * Helper function for fetching Tasks or Categories.
     * @param tableType 
     */
    const onFetch = async (tableType: string) => {
        const data: (TASK[] | CAT[]) = await fetchTable(tableType) as (TASK[] | CAT[]);

        tableType === "tasks" ? tasks.value = data as TASK[] : categories.value = data as CAT[]
    }


    /**
     * * These async funtions are triggered on component load
     */
    onMounted(async () => {
        await onFetch('categories')
        await onFetch('tasks')
        await sortByUrgencyAndCompletion(tasks)
    }) 
</script>

<style lang="scss">
    @import "./assets/_variables.scss";
    
    $textColor: $textWhite;
    $primaryColor: lightgrey;
    $secondTextColor: #1f2023;
    
    .taskName,
    .categoryName {
        display: flex;
        flex: 1 1 auto;
    }

    .categoryList > li {
        display: flex;
        justify-content: flex-end;
        
        @each $key, $name in $colors {
            &.#{$key} { 
                border-color: #{$name};

                button { 
                    background-color: #{$name};
                    border-color: darken($name, 20%);
                    color: darken($name, 40%);
                    margin: $standardMargin/4;

                    &:not(:only-child):last-child { margin-right: 0 }
                }
                span { 
                    color: #{$name};
                    margin-right: auto; 
                }
            }
        }
    } 

</style>
