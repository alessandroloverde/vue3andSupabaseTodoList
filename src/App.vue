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

            <section class="tasksArea">
                <header>
                    <form @submit.prevent="addElement('tasks')">
                        <label class="tasksArea--title"><span>New </span>Task</label>
                        <input v-model="newTodo" type="text" name="newTodo" autocomplete="off">
                        <button
                            role="button"
                            aria-label="Add new task"
                            class="btn--add"
                        ></button>
                    </form>
                    <div class="tasksArea--completedSwitch">
                        <label class="toggle">
                            <span class="toggle--label" v-show="completedAreVisible">Hide <br>completed</span>
                            <span class="toggle--label" v-show="!completedAreVisible">Show <br>completed</span>
                            <input class="toggle--checkbox" id="topo" type="checkbox" v-model="completedAreVisible">
                            <div class="toggle--switch"></div>
                        </label>
                    </div>
                </header>
                <section class="tasksArea--info">
                    <h4>Tasks <span>{{ tasks?.length }}</span></h4>
                    <h4>Completed <span>{{ tasks?.filter(el => el.completed).length }}</span></h4>
                </section>
                <section class="tasksArea--main">
                    <ul>
                        <li v-for="(todo, index) in tasks" 
                            :key="todo.id!"
                            class="taskList"
                            :class="['category-' + todo.category, computedColor(todo), { completed: todo.completed }]"
                            v-show="!todo.completed ? true : (completedAreVisible && todo.completed) || (!completedAreVisible && !todo.completed)"
                        >   
                            <div class="taskList--completeTask">
                                <button 
                                    :class="{ completed: todo.completed }"
                                    class="topo btn--icn--icon-check_circle iconOnly" 
                                    role="button" aria-label="Complete task"
                                    @click="S_doneTodo(todo.id, todo)"
                                ></button>
                            </div>
                            <div v-if="editingTask[index]">
                                <input 
                                    type="text" 
                                    v-model="tempEditName[index]" 
                                    @blur="updateTaskName(index, todo.name)"
                                    @keypress.enter="updateTaskName(index, todo.name!)">
                            </div>
                            <div v-else 
                                class="taskList--title" 
                                :class="{ completed: todo.completed }"
                                @click="S_doneTodo(todo.id, todo)">
                                    <h3>{{ todo.name }}</h3>
                            </div>
                            <div class="taskList--actions">
                                <div class="urgentSwitch">
                                    <label class="form-control">
                                    <input type="checkbox" 
                                        :class="{ isUrgent: !todo.is_urgent }"
                                        :checked="todo.is_urgent" 
                                        @click="setUrgency(todo.id, todo)"> 
                                    </label>
                                </div>
                                <button
                                    role="button"
                                    aria-label="Edit name" 
                                    class="btn--icn--icon-pencil iconOnly editTask"
                                    @click="editTaskName(index)"
                                ></button>
                                <button
                                    role="button"
                                    aria-label="Remove task" 
                                    class="btn--icn--icon-trash-o iconOnly removeItem"  
                                    @click="removeItem('tasks', todo.id, tasks, categories)"
                                ></button>
                            </div>
                            <div class="taskList--category">
                                <Popper :placement="'left'" arrow>
                                    <template #content>
                                        <div>
                                            <select 
                                                :id="`castoro-${index}`" 
                                                @change="updateCategory('tasks', todo.id, todo.category)" 
                                                v-model="todo.category"
                                            >
                                                <option>Assign a category</option>
                                                <option>Remove category</option>
                                                <option v-for="category in categories" :key=category.id!>{{category.name}}</option>
                                            </select>
                                        </div>
                                    </template>
                                    <div :class="
                                        categories?.some(category => category.name === todo.category) ? 
                                        categories.find(category => category.name === todo.category)?.icon : 
                                        'icon-star'"
                                    ></div>
                                </Popper>

                            </div>
                        </li>
                    </ul>
                    <h4 v-if="tasks!.length === 0 ">Empty list.</h4>
                </section>
            </section>
        </div>
    </main>
</template>
<!-- <script lang="ts">
    export const tasks: Ref<TASK[] | null> = ref([]);
    export const categories: Ref<CAT[] | null> = ref([]);
</script> -->
<script setup lang="ts">
    import { ref, reactive, onMounted, computed } from 'vue';
    import Popper from "vue3-popper";
    import { createClient } from '@supabase/supabase-js';
    import { removeItem, fetchTable, updateColor, updateCategory, S_saveData } from './api/apiSupabase';
    import type { Ref } from 'vue';
    import type { TASK, CAT } from './api/apiSupabase';
    import AppHeader from './components/AppHeader.vue';
    import CategoriesArea from './components/CategoriesArea.vue';
   
    const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    const categoryName: Ref<CAT["name"]> = ref('');
    const newTodo = ref(null);

    const tasks: Ref<TASK[] | null> = ref([]);
    const categories: Ref<CAT[] | null> = ref([]);

    let editingTask: boolean[] = reactive([])
    let tempEditName = reactive(Array(categories.value?.length).fill(''))
    let completedAreVisible = ref(false)
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


    /**
     * * Helper function for allowing the edit of a task
     * @param index
     */
    const editTaskName = (index: number) => {
        editingTask[index] = !editingTask[index]
      
        tempEditName[index] = tasks.value !==null ? tasks.value[index].name : ""
    }


    /**
     * * Computed property that counts done todos.
     */
    let todo_eseguiti = computed(() => {
        return tasks.value!.filter(item => item.completed).length
    })


    /**
     * * Function that assign the category's color to a class for a todo.
     * @param todo 
     */
     const computedColor = (todo: TASK) => {
        const foundCategory = categories.value !== null ? categories.value.find(category => category.name === todo.category) : categories.value

        return foundCategory?.color
    };


    // === Async functions ================================================================================================
    /**
     * * Function for updating a tasks's name
     * @param index 
     * @param oldTaskName 
     */
     const updateTaskName = async ( index: number, oldTaskName: string) => {
        let newTaskName = tempEditName[index]

        try {
            const { error: updateTaskError } = await supabase
                .from('tasks')
                .update({ name: newTaskName })
                .eq('name', oldTaskName);

            if (updateTaskError) {
                console.error('Error updating task:', updateTaskError);

                return;
            }

            tempEditName[index] = tasks.value![index].name
            editingTask[index] = false

            onFetch('tasks')
            onFetch('categories')
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }


    /**
     * * Helper function for fetching Tasks or Categories.
     * @param tableType 
     */
    const onFetch = async (tableType: string) => {
        const data: (TASK[] | CAT[]) = await fetchTable(tableType) as (TASK[] | CAT[]);

        tableType === "tasks" ? tasks.value = data as TASK[] : categories.value = data as CAT[]
    }


    /**
     * * Function for adding a Task or a Category.
     * @param S_table 
     */
    const addElement = async (S_table: string) => {
        const newTodoData: TASK = {
            completed: false,
            name: newTodo.value ?? '',
            user: myAuth?.userID?.value ? myAuth.userID.value : null,
            id: null
        }
        const newCategoryData: CAT = {
            name: categoryName.value ?? '',
            id: null,
            user: myAuth?.userID?.value ? myAuth.userID.value : null,
        }


        if (S_table === 'tasks' && newTodo.value) {
            tasks.value?.push(newTodoData);

            newTodo.value = null;

            S_saveData(S_table, newTodoData);
        } else if (S_table === 'categories' && categoryName.value) {
            categories.value?.push(newCategoryData);

            categoryName.value = '';

            S_saveData(S_table, newCategoryData);
        } 
    }


    /**
     * * Supabase: set a to todo to done
     * ! Done sorting is not reactive on start
     */
    async function S_doneTodo (S_id: number | null, todo: TASK) {
        todo.completed = !todo.completed;

        await supabase.from("tasks").update({ completed: todo.completed }).eq('id', S_id)

        sortByUrgencyAndCompletion(tasks)
    }


    /**
     * * Function to set a task as urgent
     * @param S_id 
     * @param todo 
     */
    const setUrgency = async (S_id: number | null , todo: TASK) => {
        todo.is_urgent = !todo.is_urgent;

        await supabase.from("tasks").update({ is_urgent: todo.is_urgent }).eq('id', S_id)

        sortByUrgencyAndCompletion(tasks)
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
