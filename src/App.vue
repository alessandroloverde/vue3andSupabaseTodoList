<template>
    <!--  <div></div> -->
    <div id="toDoArea">
        <h1>ToDo Area</h1>
        <form @submit.prevent="addTodo()">
            <label>New ToDo </label>
            <input v-model="newTodo" name="newTodo" autocomplete="off">
            <button>Add ToDo</button>
        </form>
        <h2>ToDo List</h2>
        <p>lunghezza: {{tasks ? tasks.length : 0}}</p>
        <p>to-do eseguiti reac: {{todo_eseguiti}}</p>
        <ul class="toDoList">
            <li v-for="(todo, index) in tasks" :key="index" :class="[
                'category-' + todo.category,
                computedColor(todo),
                { completed: todo.completed }
            ]">
                <span :class="{ completed: todo.completed }" @click="S_doneTodo(todo.id, todo)">{{ todo.content }}</span>
                <select 
                    :id="`castoro-${index}`" 
                    @change="S_updateCategory(todo.id, 'tasks', todo.category)" 
                    v-model="todo.category"
                >
                    <option>Assign a category</option>
                    <option>Remove category</option>
                    <option v-for="category in categories" :key=category.id>{{category.name}}</option>
                </select>
                <span>{{todo.category}}</span>
                <button @click="removeItem('tasks', todo.id, tasks, categories)">Remove</button>
            </li>
        </ul>
        <h4 v-if="tasks!.length === 0 ">Empty list.</h4>
    </div>

    <div id="categoriesArea">
        <h1>Categories Area</h1>
        <form @submit.prevent="onSaveCat(categoryName)">
            <label>New category</label>
            <input v-model="categoryName" name="categoryName" autocomplete="off">
            <button>Add category</button>
        </form>
        <h2>Categories List</h2>
        <p>lunghezza: {{categories ? categories.length : 0}}</p>
        <ul class="categoryList">
            <li v-for="(category, index) in categories" :key=category.id :class="categories ? categories[index].color : ''">
                <span>{{category.name}}</span>
                <select :id="`volpe-${index}`" @change="S_assignColor($event, category.color, category.id)" v-model="category.color">
                    <option>Assign a color</option>
                    <option>Remove color</option>
                    <option v-for="color, index in colors()" :key=index>{{color}}</option>
                </select>
                <button @click="removeItem('categories', category.id, tasks, categories)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, watchEffect} from 'vue';
    import { computed } from 'vue';
    import { createClient } from '@supabase/supabase-js';
    import { fetchTasks, fetchCategories, removeItem, saveCategory } from './api/apiSupabase';
    import type { Ref } from 'vue';
    import type { TASK, CAT } from './api/apiSupabase';
   
    const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    const tasks: Ref<TASK[] | null> = ref([]);
    const categories: Ref<CAT[] | null> = ref([]);
    
    const categoryName: Ref<CAT["name"] | null> = ref(null);
    const newTodo = ref('');

    const onSaveCat = async (name: CAT["name"] | null) => {
        const data = await saveCategory(name)

        categories.value = data
    }

    /**
     * ! Test
     */

    /**
     * ! Chrome does not load :root
     */
    const colors = () => {
        const r = document.querySelector(':root'),
                rs = r ? getComputedStyle(r) : [],
                prefix = "--color--";

        const result = Object.values(rs).filter(el => el.startsWith(prefix))

        //console.log('r', r)
        //console.log('rs', rs)

        return result.map(el => el.replace(prefix, ''))
    }

    //console.log(colors());

    let todo_eseguiti = computed(() => {
        return tasks.value!.filter(item => item.completed).length
    })

    const computedColor = (todo: TASK) => {
        const foundCategory = categories.value!.find(category => category.name === todo.category);

        return foundCategory?.color
    };

    function addTodo() {
        let today = new Date();

        const newTodoData: TASK = {
            id: 6666666666666,
            completed: false,
            content: newTodo.value,
            created_at: null,
            category: null,
            user: null
            /* created_at: today.setHours(0, 0, 0, 0) */
        }
        
        if (newTodo.value) {
            tasks.value?.push(newTodoData);
            newTodo.value = '';
        }
        S_saveData('tasks', newTodoData);
    }



    /**
     * * Supabase - save
     */
    async function S_saveData(S_table: string, S_content: TASK) {
        const { error } = await supabase.from(S_table).insert([
            { 
                completed: false,
                content: S_content.content,
                //category: S_content.category,
                //created_at: S_content.created_at
            },
        ]).select()

        console.log('save content', S_content)

        S_table ? "tasks" && await fetchTasks(tasks) : await fetchCategories()
    }


    /**
     * * Supabase - assign a color to a category
     */
    const S_assignColor = ($event: Event, color: string|null, S_id: number) => {
        color = ($event.target as HTMLInputElement).value

        S_updateColorCategory(color, S_id)
    }

    /**
     * * Supabase - update color category
     */
    async function S_updateColorCategory(S_content: string, S_id: number) { 
        const { error } = await supabase.from("categories").update({ color: S_content }).eq('id', S_id)

        return error
    }

    /**
     * * Supabase - update category in todo
     */
    async function S_updateCategory(S_id: number, S_table: string, S_content: string|null) { 
        await supabase.from(S_table).update({ category: S_content }).eq('id', S_id)
    }


    /**
     * * Supabase: set a to todo to done
     * ! Done sorting is not reactive on start
     */
    async function S_doneTodo (S_id: number, todo: TASK) {
        todo.completed = !todo.completed;

        await supabase.from("tasks").update({ completed: todo.completed }).eq('id', S_id)

        console.log(tasks.value)

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
        const data = await fetchCategories();
        categories.value = data
        fetchTasks(tasks);
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
        width: 50%;
        padding: 10px;
    }
    #categoriesArea {
        width: 50%;
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
            padding-left: $size2;
            padding-right: $size2;
            border-radius: $size1;
            font-size: 18px;
            margin-top: $size1;
            margin-bottom: $size2;
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
            padding: $size2 $size4;
            border-radius: $size1;
            margin-bottom: $size2;
            
            span { cursor: pointer }
            &.completed {
                text-decoration-line: line-through;
                text-decoration-color: gray;
                opacity: 0.5;
            }
            button {
                font-size: $size2;
                padding: $size1;
            }
        }
    }
    h4 {
        text-align: center;
        opacity: 0.5;
        margin: 0;
    }    
    .toDoList > li {
        background-color: lightgoldenrodyellow;

        span { color: black; } // ** temp

        @each $key, $name in $colors {
            &.#{$key} { 
                background-color: #{$name};
                border-color: darken($name, 20%);

                button { 
                    border-color: darken($name, 20%);
                    color: darken($name, 50%);
                }
                span { color: darken($name, 40%) }
            }
        }
    }
    .categoryList > li {
        @each $key, $name in $colors {
            &.#{$key} { 
                border-color: #{$name};

                button { 
                    background-color: #{$name};
                    border-color: darken($name, 20%);
                    color: darken($name, 50%);
                }
                span { color: #{$name} }
            }
        }
    } 
</style>
 