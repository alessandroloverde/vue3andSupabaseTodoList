<template>    
    <section class="tasksArea">
        <header>
            <form @submit.prevent="saveNewTask()">
                <label class="tasksArea--title"><span>New </span>Task</label>
                <input v-model="newTaskName" type="text" name="newTodo" autocomplete="off">
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
</template>

<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { TASK } from '../api/apiSupabase';

    import Popper from "vue3-popper";
    import { reactive, ref } from 'vue';
    import { removeItem, updateColor, updateIcon, detectCSSVariables, S_saveData } from '../api/apiSupabase';

    const props = defineProps(['categories', 'tasks', 'supabase'])
    const emit = defineEmits(['taskUpdated'])

    let editableIndex = ref(-1)
    let taskName: Ref<string>[] = reactive([])
    let newTaskName: Ref<string> = ref('')


    /**
     * * Fx for saving a new task in the DB. It emits an event.
     */
    const saveNewTask = async () => {
        let content: TASK = {
            name: newTaskName.value,
            id: null,
            completed: false
            //user: to be done yet
        }

        await S_saveData('categories', content)
        await emit('taskUpdated');
    }

</script>