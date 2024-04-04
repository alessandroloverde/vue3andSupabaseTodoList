<template>    
    <section class="tasksArea">
        <header>
            <form @submit.prevent="saveNewTask()">
                <label class="tasksArea--title" for="createNewTask"><span>New </span>Task</label>
                <input v-model="newTaskName" type="text" name="newTodo" autocomplete="off" id="createNewTask">
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
                <li v-if="tasks" v-for="(todo, index) in tasks" 
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
                    <div v-if="editableIndex2 === index">
                        <input 
                            type="text" 
                            v-model="taskName[index]" 
                            @blur="updateTaskName(index)"
                            @keypress.enter="updateTaskName(index)">
                    </div>
                    <div v-else 
                        class="taskList--title" 
                        :class="{ completed: todo.completed }"
                        @click="S_doneTodo(todo.id, todo)">
                            <h4>{{ todo.name }}</h4>
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
</template>

<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { TASK } from '../api/apiSupabase';

    import Popper from "vue3-popper";
    import { reactive, ref } from 'vue';
    import { removeItem, S_saveData, updateCategory } from '../api/apiSupabase';
    import { sortByUrgencyAndCompletion } from '../pages/Home.vue'

    import useAuthUser from "../composables/UseAuthUser"

    const { supabase } = useAuthUser();
    
    const props = defineProps(['categories', 'tasks' ])
    const emit = defineEmits(['taskUpdated'])

    let editableIndex2: Ref<number> = ref(-1)
    let taskName: Ref<string>[] = reactive([])
    let newTaskName: Ref<string> = ref('')
    let completedAreVisible: Ref<boolean> = ref(false)

    /**
     * ! update fires multiple times
     */

     /**
      * ! Urgency icon swapped
      */

    /**
     * * Fx for saving a new task in the DB. It emits an event.
     */
    const saveNewTask = async () => {
        let content: TASK = {
            name: newTaskName.value,
            id: null,
            completed: false,
            user: ''
        }

        await S_saveData('tasks', content)
        await emit('taskUpdated')
        
        newTaskName.value = ''
    }


    /**
     * * Function that assign the category's color to a class for a todo.
     * @param todo 
     */
     const computedColor = (todo: TASK) => {
        const foundCategory = props.categories !== null ? props.categories.find(category => category.name === todo.category) : props.categories

        return foundCategory?.color
    };


    /**
     * * Function to set a task as urgent
     * @param S_id 
     * @param todo 
     */
     const setUrgency = async (S_id: number | null , todo: TASK) => {
        todo.is_urgent = !todo.is_urgent;

        await supabase.from("tasks").update({ is_urgent: todo.is_urgent }).eq('id', S_id)

        sortByUrgencyAndCompletion(props.tasks)
    }


    /**
     * * Fxs for editing a single existing cat, one input at time. The second saves (update) the result and emits the event.
     */
    const editTaskName = (index: number) => {
        editableIndex2.value = editableIndex2.value === index ? -1 : index;
        
        taskName[index] = props.tasks[index].name
    }
    const updateTaskName = async (index: number) => {
        let oldTask = props.tasks !== null ? props.tasks[index].name : ""
        let newTask = taskName[index]

        try {
            const { error: updateTaskError } = await supabase
                .from('tasks')
                .update({ name: newTask })
                .eq('name', oldTask);

            if (updateTaskError) {
                console.error('Error updating task:', updateTaskError);

                return
            }

            editableIndex2.value = -1

            await emit('taskUpdated');
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }


    /**
     * * Supabase: set a to todo to done
     * ! Done sorting is not reactive on start
     */
     async function S_doneTodo (S_id: number | null, todo: TASK) {
        todo.completed = !todo.completed;

        await supabase.from("tasks").update({ completed: todo.completed }).eq('id', S_id)

        sortByUrgencyAndCompletion(props.tasks)
    }

</script>