<template>
    <div></div>
    <div id="toDoArea">
        <h1>ToDo Area</h1>
        <form @submit.prevent="addTodo()">
            <label>New ToDo </label>
            <input v-model="newTodo" name="newTodo" autocomplete="off">
            <button>Add ToDo</button>
        </form>
        <h2>ToDo List</h2>
        <p>lunghezza: {{todos.length}}</p>
        <p>to-do eseguiti reac: {{todo_eseguiti}}</p>
        <ul class="toDoList">
            <li v-for="(todo, index) in S_tasks" :key="index" :class="[
                'category-' + todo.category,
                computedColor(todo.category,todo)
            ]">
                <span :class="{ done: todo.done }" @click="doneTodo(todo)">{{ todo.content }}</span>
                <select :id="`castoro-${index}`" @change="S_updateCategory(todo.id, 'tasks', todo.category)" v-model="todo.category ">
                    <option>Assign a category</option>
                    <option>Remove category</option>
                    <option v-for="category in S_categories">{{category.name}}</option>
                </select>
                <span>{{todo.category}}</span>
                <button @click="S_deleteData(todo.id)">Remove</button>
            </li>
        </ul>
        <h4 v-if="todos.length === 0">Empty list.</h4>
    </div>

    <div id="categoriesArea">
        <h1>Categories Area</h1>
        <form @submit.prevent="S_saveCategory()">
            <label>New category</label>
            <input v-model="newCategory" name="newCategory" autocomplete="off">
            <button>Add category</button>
        </form>
        <h2>Categories List</h2>
        <p>lunghezza: {{S_categories.length}}</p>
        <ul class="categoryList">
            <li v-for="(category, index) in S_categories" :class="S_categories[index].color">
                <span>{{category.name}}</span>
                <select :id="`volpe-${index}`" @change="S_assignColor(category.color, category.id)" v-model="category.color">
                    <option>Assign a color</option>
                    <option>Remove color</option>
                    <option v-for="color in colors()">{{color}}</option>
                </select>
                <button @click="removeItem('categories', index)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import { computed } from 'vue';

    import { createClient } from '@supabase/supabase-js';

    export default {
        name: 'App',
        setup () {
            const supabase = createClient('https://fsgwoyxsgndqfwratjco.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZ3dveXhzZ25kcWZ3cmF0amNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0NDE2MDYsImV4cCI6MjAwNTAxNzYwNn0.DLMt0QG2OJ03CrfjGkosjNPYsh8DGS6jaeelxjvNZ0Y');

            const S_tasks = ref([]);
            const S_categories = ref([]);
          

            const newCategory = ref('');
            const newTodo = ref('');
            const assignedCategory = ref('');
            const assignedColor = ref('');

            const todosData = JSON.parse(localStorage.getItem('todos')) || [];
            const categoriesData = JSON.parse(localStorage.getItem('categories')) || [];

            const todos = ref(todosData);
            const categories = ref(categoriesData);

            const colors = () => {
                const r = document.querySelector(':root');
                const rs = getComputedStyle(r);
                const prefix = "--color--";

                const result = Object.values(rs).filter(el => el.startsWith(prefix))

                return result.map(el => el.replace(prefix, ''))
            }

            //console.log(getComputedStyle(document.querySelector(':root')).length)
            console.log(colors());

            let todo_eseguiti = computed(() => {
                return todos.value.filter(item => item.done).length
            })

            const computedColor = (category, todo) => {
                const foundCategory = S_categories.value.find(category => category.name === todo.category);

                return foundCategory ? foundCategory.color : undefined;
            };


            function addTodo() {
                let today = new Date();

                const newTodoData = {
                    done: false,
                    content: newTodo.value,
                    category: null,
                    /* created_at: today.setHours(0, 0, 0, 0) */
                }
                
                if (newTodo.value) {
                    S_tasks.value.push(newTodoData);
                    S_tasks.value = '';
                }
                S_saveData('tasks', newTodoData);
            }

            function addCategory() {
                if (newCategory.value) {
                    categories.value.push({
                        name: newCategory.value,
                        color: ''
                    });
                    newCategory.value = '';
                }

                saveData('categories')
            }

            function doneTodo (todo) {
                todo.done = !todo.done;

                saveData()
            }

            function removeTodo (index) {
                todos.value.splice(index, 1);

                saveData()
            }

            /**
             * * Assign a color to a category
             */
            const assignColor = (category) => {
                var r = document.querySelector(':root');
                var rs = getComputedStyle(r);

                category.color = event.target.value

                /* r.style.setProperty('--topo', category.color) */

                saveData('categories')
            }


            /**
             * * Assign a category to a to-do. 
             */
            const assignCategory = (todo) => {
                const inputValue = event.target.value;

                if(inputValue === "Remove category") {
                    todo.category = ''
                } else {
                    todo.category = inputValue
                }
                
                saveData()
            }

            /**
             * * Remove item (category or todo). Param passed is a string that is avaluated as a variable.
             * * When a category, it will be removed form the todo, if assigned.
             */
            const removeItem = (itemType, index) => {
                const reference = ref(itemType).value

                if(itemType === "categories") {
                    todos.value.forEach(element => {
                        element.category === eval(itemType).value[index] ? element.category = '' : element.category = element.category
                    });
                    
                    eval(itemType).value.splice(index, 1)

                    saveData()
                } else {
                    eval(itemType).value.splice(index, 1)
                }

                saveData(reference)
            }

            /**
             * * Save data function. Param passed is a string that is avaluated as a variable.
             */
            const saveData = (type='todos') => {
                const reference = ref(type).value;
                const storageData = JSON.stringify(eval(reference).value);

                localStorage.setItem(type, storageData)
            }
            
            /**
             * * Supabase - fetch
             */
            async function S_fetchData(S_table) {
                const { data } = await supabase.from(S_table).select()

                if (S_table === "tasks") {
                    S_tasks.value = data
                } else if (S_table === "categories") {
                    S_categories.value = data
                }
            }

            /**
             * * Supabase - save
             */
            async function S_saveData(S_table, S_content) {
                const { data, error } = await supabase.from(S_table).insert([
                    { 
                        completed: S_content.done,
                        content: S_content.content,
                        //category: S_content.category,
                        //created_at: S_content.created_at
                    },
                ]).select()

                errorHandling(error)

                await S_fetchData(S_table);
            }

            /**
             * * Supabase - save category
             */
            async function S_saveCategory() {
                const newCategoryData = {
                    name: newCategory.value,
                }

                const { data, error } = await supabase.from('categories').insert(newCategoryData).select()

                if (newCategory.value) {
                    S_categories.value.push({
                        name: newCategory.value,
                        color: ''
                    });
                    newCategory.value = '';
                }

                errorHandling(error)
            }

            /**
             * * Supabase - assign a color to a category
             */
            const S_assignColor = (color, id) => {
                var r = document.querySelector(':root');
                var rs = getComputedStyle(r);

                color = event.target.value

                /* r.style.setProperty('--topo', category.color) */

                S_updateColorCategory(color, id)
            }

            /**
             * * Supabase - update color category
             */
            async function S_updateColorCategory(S_content, S_id) { 
                const { error } = await supabase.from("categories").update({ color: S_content }).eq('id', S_id)
            }

            /**
             * * Supabase - update category in todo
             */
            async function S_updateCategory(S_id, S_table, S_content) { 
                const { error } = await supabase.from(S_table).update({ category: S_content }).eq('id', S_id)
            }

            /**
             * * Supabase - remove
             */
            async function S_deleteData(S_id) {
                const { error } = await supabase.from('tasks').delete().eq('id', S_id)
                
                await S_fetchData('tasks');
            }

            /**
             * * Supabase - error handling function
             */
            let errorHandling = error => {
                if(error) {
                    alert(error.message)
                    console.log(error.code)
                }
            }


            onMounted(() => {
                S_fetchData('tasks');
                S_fetchData('categories');
            })
            
            return {
                S_tasks,
                S_categories,
                S_updateCategory,
                S_updateColorCategory,
                S_saveData,
                S_deleteData,
                S_saveCategory,
                S_assignColor,
                errorHandling,
                todos,
                categories,
                newTodo,
                newCategory,
                addTodo,
                addCategory,
                assignCategory,
                doneTodo,
                removeTodo,
                removeItem,
                saveData,
                todo_eseguiti,
                assignedCategory,
                colors,
                assignedColor,
                assignColor,
                computedColor
            }
        }
    }
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
            .done {
                text-decoration: line-through;
                color: red;
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
                span { 
                    color: darken($name, 40%) 
                }
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
 