<template>
    <div></div>
    <!-- Tasks Area-->
    <div id="toDoArea">
        <h1><i class="icon-plus"></i>ToDo Area</h1>
        <form @submit.prevent="addElement('tasks')">
            <label>New ToDo </label>
            <input v-model="newTodo" name="newTodo" autocomplete="off">
            <button>Add ToDo</button>
        </form>
        <h2 class="iconTopo">ToDo List</h2>
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
                <div class="taskName" :class="{ completed: todo.completed }" @click="S_doneTodo(todo.id, todo)">{{ todo.name }}</div>
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
    <div id="categoriesArea">
        <h1>Categories Area</h1>
        <form @submit.prevent="addElement('categories')">
            <label>New category</label>
            <input v-model="categoryName" name="categoryName" autocomplete="off">
            <button>Add category</button>
        </form>
        <h2>Categories List</h2>
        <p>lunghezza: {{categories ? categories.length : 0}}</p>
        <ul class="categoryList">
            <li v-for="(category, index) in categories" :key=category.id :class="categories ? categories[index].color : ''">
                <div 
                    v-if="category.icon" 
                    :class="[category.icon, category.color]" 
                    class="selectedIcon"
                ></div>
                <div v-if="editingCat[index]">
                    <input 
                        type="text" 
                        v-model="tempEditName[index]" 
                        @blur="saveName(index, category.name)"
                        @keypress.enter="saveName(index, category.name)">
                </div>
                <div v-else class="categoryName">{{category.name}}</div>
                <Popper :placement="'top'" arrow>
                    <template #content>
                        <div class="colorPicker">
                            <input 
                                type="radio"
                                :name="`colorPicker-${category.id}`"
                                :checked="false"
                                v-for="color, index in colors()" 
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
                                v-for="icon, index in icons()" 
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
                    @click="editName(index)"
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
    let tempEditName = reactive(Array(categories.value.length).fill('temp'));


    const editName = (index: number) => {
        editingCat[index] = !editingCat[index]
      
        tempEditName[index] = categories.value[index].name
    }


    /**
     * ! Chrome does not load :root
     */
     const colors = () => {
        const r = document.querySelector(':root'),
              rs = r ? getComputedStyle(r) : [],
              prefix = "--color--";

        const result = Object.values(rs).filter(el => el.startsWith(prefix))

        return result.map(el => el.replace(prefix, ''))
    }
    const icons = () => {
        const r = document.querySelector(':root'),
              rs = r ? getComputedStyle(r) : [],
              prefix = "--icons--";

        const result = Object.values(rs).filter(el => el.startsWith(prefix))

        return result.map(el => el.replace(prefix, ''))
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
        const foundCategory = categories.value!.find(category => category.name === todo.category);

        return foundCategory?.color
    };




    const saveName = async ( index: number, oldCatName: string) => {
        let newCategoryName = tempEditName[index]

        try {
            // Update the category name in the 'tasks' table
            const { data: tasksToUpdate, error: tasksError } = await supabase.from('tasks').select('id').eq('category', oldCatName);

            if (tasksError) {
                console.error('Error fetching tasks to update:', tasksError)

                return
            }

            // Update the category name in the 'categories' table
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

            console.log('Category and tasks updated successfully.');
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }

        onFetch('tasks')
        onFetch('categories')
    }


    /**
     * * Helper function for fetching Tasks or Categories.
     * @param tableType 
     */
    const onFetch = async (tableType: string) => {
        const data: CAT[] & TASK[]  = await fetchTable(tableType)

        tableType === "tasks" ? tasks.value = data : categories.value = data
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

        tasks.value!.sort((a, b) => {
            const x = a.completed
            const y = b.completed

            if(x && y && x > y) { return 1 }
            if(x && y && x < y) { return -1 }
            return 0
        })
    }


    /**
     * ! Edit a ToDo still missing
     */
    

     onMounted(async () => {
        onFetch('tasks')
        onFetch('categories')

        editingCat = reactive(Array(categories.value.length).fill(false));
    })
                
    
</script>

<style lang="scss">
    @import "./assets/_variables.scss";

    $border: 2px solid rgba($color: white, $alpha: 0.35);
    $size1: 6px;
    $size2: 12px;
    $size3: 18px;
    $size4: 24px;
    $size5: 48px;
    $backgroundColor: #27292d;
    $textColor: white;
    $primaryColor: lightgrey;
    $secondTextColor: #1f2023;
    

    #app {
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        display: flex;
    }
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
        background-color: $backgroundColor;
        color: $textColor;
    }
    h1 {
        font-weight: bold;
        font-size: 28px;
        text-align: center;
        color: var(--topo);
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        
        label {
            font-size: 14px;
            font-weight: bold;
        }
        input,
        button {
            height: $size5;
            box-shadow: none;
            outline: none;
            padding-left: $standardMargin;
            padding-right: $standardMargin;
            border-radius: $size1;
            font-size: 18px;
            margin-top: $size1;
            margin-bottom: $standardMargin;
        }
        input {
            background-color: transparent;
            border: $border;
            color: inherit;
        }
    }
    button {
        cursor: pointer;
        background-color: $primaryColor;
        border: 1px solid $primaryColor;
        color: $secondTextColor;
        font-weight: bold;
        outline: none;
        border-radius: $size1;
    }
    h2 {
        font-size: 22px;
        border-bottom: $border;
        padding-bottom: $size1;
    }
    ul {
        padding: 10px;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: $border;
            padding: $standardMargin ($standardMargin * 2);
            border-radius: $size1;
            margin-bottom: $standardMargin;
            
            span { cursor: pointer }
            &.completed {
                text-decoration-line: line-through;
                text-decoration-color: gray;
                opacity: 0.5;
            }
            button {
                font-size: $standardMargin;
                padding: $size1;
            }
        }
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
 