<template>
    <header class="appHeader">
        <h1 class="appHeader--title">Wondertask</h1>
        <aside class="appHeader--avatar">
            <Popper :placement="'left'" arrow >
                    <template #content class="flyoutMenu">
                        <div >
                            <ul>
                                <li>Welcome Supabase</li>
                                <li>Login</li>
                                <li>Logout</li>
                            </ul>
                        </div>
                    </template>
                    <button
                        role="button"
                        aria-label="Login options" 
                        class="btn--avatar"  
                        @click=""
                    ></button>
            </Popper>
        </aside>
    </header>
    <main>
        <div class="appContainer">
            <section class="categoriesArea"></section>
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
                    <div>
                        <label class="toggle">
                            <span class="toggle--label" v-show="completedAreVisible">Hide completed</span>
                            <span class="toggle--label" v-show="!completedAreVisible">Show completed</span>
                            <input class="toggle--checkbox" id="topo" type="checkbox" v-model="completedAreVisible">
                            <div class="toggle--switch"></div>
                        </label>
                    </div>
                </header>
                <main>Main</main>
            </section>
        </div>
    </main>
    <!-- Tasks Area-->
    <div id="toDoArea" style="display: none;">
        <h1><i class="icon-plus"></i>ToDo Area</h1>
        <form @submit.prevent="addElement('tasks')">
            <label>New ToDo </label>
            <input v-model="newTodo" name="newTodo" autocomplete="off">
            <button>Add ToDo</button>
        </form>
        <h2>ToDo List</h2>
        <p>lunghezza: {{tasks ? tasks.length : 0}}</p>
        <p>to-do eseguiti reac: {{todo_eseguiti}}</p>
        <ul class="taskList">
            <li v-for="(todo, index) in tasks" 
                :key="index" 
                :class="['category-' + todo.category, computedColor(todo), { completed: todo.completed }]"
            >
                <div class="selectedIcon" :class="
                    categories.some(category => category.name === todo.category) ? 
                    categories.find(category => category.name === todo.category).icon : 
                    'to be replaced'">
                </div>
                <div v-if="editingTask[index]">
                    <input 
                        type="text" 
                        v-model="tempEditName[index]" 
                        @blur="updateTaskName(index, todo.name)"
                        @keypress.enter="updateTaskName(index, todo.name)">
                </div>
                <div 
                    v-else class="taskName" 
                    :class="{ completed: todo.completed }" 
                    @click="S_doneTodo(todo.id, todo)">
                        {{ todo.name }}
                </div>
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
                    class="btn--icn--icon-pencil"
                    @click="editTaskName(index)"
                ></button>
                <select 
                    :id="`castoro-${index}`" 
                    @change="updateCategory('tasks', todo.id, todo.category)" 
                    v-model="todo.category"
                >
                    <option>Assign a category</option>
                    <option>Remove category</option>
                    <option v-for="category in categories" :key=category.id>{{category.name}}</option>
                </select>
                <button
                    role="button"
                    aria-label="Remove task" 
                    class="btn--icn--icon-trash-o"  
                    @click="removeItem('tasks', todo.id, tasks, categories)"
                ></button>
            </li>
        </ul>
        <h4 v-if="tasks!.length === 0 ">Empty list.</h4>
    </div>

    <!-- Categories Area -->
    <div id="categoriesArea" style="display: none;">
        <h1>Categories Area</h1>
        <form @submit.prevent="addElement('categories')">
            <label>New category</label>
            <input v-model="categoryName" name="categoryName" autocomplete="off">
            <button>Add category</button>
        </form>
        <h2>Categories List</h2>
        <p>lunghezza: {{categories ? categories.length : 0}}</p>
        <ul class="categoryList">
            <li v-for="(category, index) in categories" :key=category.id :class="categories ? categories[index].color : null">
                <div 
                    v-if="category.icon" 
                    :class="[category.icon, category.color]" 
                    class="selectedIcon"
                ></div>
                <div v-if="editingCat[index]">
                    <input 
                        type="text" 
                        v-model="tempEditName[index]" 
                        @blur="updateCatName(index, category.name)"
                        @keypress.enter="updateCatName(index, category.name)">
                </div>
                <div v-else class="categoryName">{{category.name}}</div>
                <Popper :placement="'top'" arrow>
                    <template #content>
                        <div class="colorPicker">
                            <input 
                                type="radio"
                                :name="`colorPicker-${category.id}`"
                                :checked="false"
                                v-for="color, index in detectCSSVariables('--color--')" 
                                :value="color"
                                v-model="category.color" 
                                :key=index 
                                :class="color" 
                                @change="updateColor(color, category.id, $event)"
                            >
                        </div>
                    </template>
                    <button
                        role="button"
                        aria-label="Open Color Picker" 
                        class="btn--icn--icon-eyedropper" 
                    ></button>
                </Popper>

                <!-- <select :id="`volpe-${index}`" @change="updateColor(category.color, category.id, $event)" v-model="category.color">
                    <option>Assign a color</option>
                    <option>Remove color</option>
                    <option v-for="color, index in colors()" :key=index>{{color}}</option>
                </select> -->
                <Popper :placement="'top'" arrow>
                    <template #content>
                        <div class="iconPicker">
                            <input 
                                type="radio"
                                :name="`iconPicker-${category.id}`"
                                :checked="false"
                                v-for="icon, index in detectCSSVariables('--icons--')" 
                                :value="icon"
                                v-model="category.icon" 
                                :key=index 
                                :class="icon" 
                                @click="updateIcon(icon, category.id, $event)"
                            >
                        </div>
                    </template>
                    <button
                        role="button"
                        aria-label="Choose custom icon"
                        class="btn--icn--icon-diamond"
                    ></button>
                </Popper>
                <div class="spacer"></div>
                <button
                    role="button"
                    aria-label="Edit name" 
                    class="btn--icn--icon-pencil" 
                    @click="editCatName(index)"
                ></button>
                <button
                    role="button"
                    aria-label="Remove category" 
                    class="btn--icn--icon-trash-o" 
                    @click="removeItem('categories', category.id, tasks, categories)"
                ></button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted, computed } from 'vue';
    import Popper from "vue3-popper";
    import { createClient } from '@supabase/supabase-js';
    import { removeItem, fetchTable, updateColor, updateCategory, updateIcon } from './api/apiSupabase';
    import type { Ref } from 'vue';
    import type { TASK, CAT } from './api/apiSupabase';
   
    const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    const tasks: Ref<TASK[] | null> = ref([]);
    const categories: Ref<CAT[] | null> = ref([]);
    
    const categoryName: Ref<CAT["name"] | null> = ref(null);
    const newTodo = ref(null);
    
    let editingCat = reactive([false]);
    let editingTask = reactive([false]);
    let tempEditName = reactive(Array(categories.value.length).fill(''));
    let completedAreVisible = ref(false);


    const sortCompleted = () => {
        tasks.value!.sort((a, b) => {
            return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
        })
    }
    const sortUrgent = () => {
        tasks.value!.sort((a, b) => {
            return (a.is_urgent === b.is_urgent) ? 0 : a.is_urgent ? -1 : 1
        })
    }


    /**
     * * Helper function for allowing the edit of a category or a task
     * @param index
     */
    const editCatName = (index: number) => {
        editingCat[index] = !editingCat[index]
      
        tempEditName[index] = categories.value[index].name
    }
    const editTaskName = (index: number) => {
        editingTask[index] = !editingTask[index]
      
        tempEditName[index] = tasks.value[index].name
    }

    /**
     * * Function that checks all the CSS rules in :root filtered by a string (prefix) that must be either '--icons--' or '--color--'
     * @param prefix
     */
    function detectCSSVariables(prefix) {
        const documentRoot:  StyleSheetList = document.styleSheets;
        let combinedRootStyles = {};

        for (let sheet of documentRoot) {
            try {
                for (let rule of sheet.cssRules) {
                    if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
                        for (let j = 0; j < rule.style.length; j++) {
                            const cssProperty = rule.style[j];
                            
                            combinedRootStyles[cssProperty] = rule.style.getPropertyValue(cssProperty);
                        }
                    }
                }
            } catch (e) { console.warn("Could not access cssRules of a stylesheet:", e) }
        }

        return Object.keys(combinedRootStyles).filter(el => el.startsWith(prefix)).map(el => el.replace(prefix, ''))
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
        const foundCategory = categories.value!.find(category => category.name === todo.category)

        return foundCategory?.color
    };


    // Async functions

    /**
     * * Function for updating the category's name
     * @param index 
     * @param oldCatName 
     */
    const updateCatName = async ( index: number, oldCatName: string) => {
        let newCategoryName = tempEditName[index]

        try {
            const { error: updateCategoryError } = await supabase
                .from('categories')
                .update({ name: newCategoryName })
                .eq('name', oldCatName);

            if (updateCategoryError) {
                console.error('Error updating category:', updateCategoryError);

                return;
            }

            tempEditName[index] = categories.value[index].name
            editingCat[index] = false

            onFetch('tasks')
            onFetch('categories')
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }

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

            tempEditName[index] = tasks.value[index].name
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
        const data: CAT[] & TASK[]  = await fetchTable(tableType)

        tableType === "tasks" ? tasks.value = data : categories.value = data

        sortUrgent()
        sortCompleted()
    }

    /**
     * * Function for saving a Task or a Category.
     */
     async function S_saveData(S_table: string, S_content: TASK | CAT) {
        const { error } = await supabase.from(S_table).insert([{ name: S_content.name }]).select()

       S_table && S_table === "tasks" ?  await onFetch('tasks') : await onFetch('categories')
    }

    /**
     * * Function for adding a Task or a Category.
     * @param S_table 
     */
    const addElement = async (S_table: string) => {
        const newTodoData: TASK = {
            completed: false,
            name: newTodo.value
        }
        const newCategoryData: CAT = {
            name: categoryName.value
        }

        if (S_table === 'tasks' && newTodo.value) {
            tasks.value?.push(newTodoData);

            newTodo.value = '';

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
    async function S_doneTodo (S_id: number, todo: TASK) {
        todo.completed = !todo.completed;

        await supabase.from("tasks").update({ completed: todo.completed }).eq('id', S_id)

        sortUrgent()
        sortCompleted()
    }

    const setUrgency = async (S_id: number, todo: TASK) => {
        todo.is_urgent = !todo.is_urgent;

        await supabase.from("tasks").update({ is_urgent: todo.is_urgent }).eq('id', S_id)

        sortUrgent()
        sortCompleted()
    }


    onMounted(async () => {
        onFetch('categories')
        onFetch('tasks')
    }) 
</script>

<style lang="scss">
    @import "./assets/_variables.scss";
    
    $backgroundColor: linear-gradient(133deg, #4c4e5b,#444659,#3f3e51,#362f42);
    $textColor: $textWhite;
    $primaryColor: lightgrey;
    $secondTextColor: #1f2023;
    
    #toDoArea {
        width: 60%;
        padding: 10px;
    }
    #categoriesArea {
        width: 40%;
        padding: 10px;
    }
    
    body {
        margin: 0;
        padding: 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        background: $backgroundColor;
        color: $textColor;
    }


    h4 {
        text-align: center;
        opacity: 0.5;
        margin: 0;
    }
    .taskName,
    .categoryName {
        display: flex;
        flex: 1 1 auto;
    }
    .taskList > li {
        background-color: lightgoldenrodyellow;

        @each $key, $name in $colors {
            &.#{$key} { 
                background-color: #{$name};
                border-color: darken($name, 20%);

                button { 
                    border-color: darken($name, 20%);
                    color: darken($name, 40%);
                    margin: $standardMargin/4;

                    &:not(:only-child):last-child { margin-right: 0 }
                }
                span { color: darken($name, 40%) }
            }
        }
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
