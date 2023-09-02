<template>
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
            <li v-for="(todo, index) in todos" :key="index" :class="[
                'category-' + todo.category,
                computedColor(todo.category,todo)
            ]">
                <span :class="{ done: todo.done }" @click="doneTodo(todo)">{{ todo.content }}</span>
                <select :id="`castoro-${index}`" @change="assignCategory(todo)" v-model="todo.category ">
                    <option>Assign a category</option>
                    <option>Remove category</option>
                    <option v-for="category in categories">{{category.name}}</option>
                </select>
                <span>{{todo.category}}</span>
                <button @click="removeItem('todos', index)">Remove</button>
            </li>
        </ul>
        <h4 v-if="todos.length === 0">Empty list.</h4>
    </div>

    <div id="categoriesArea">
        <h1>Categories Area</h1>
        <form @submit.prevent="addCategory()">
            <label>New category</label>
            <input v-model="newCategory" name="newCategory" autocomplete="off">
            <button>Add category</button>
        </form>
        <h2>Categories List</h2>
        <p>lunghezza: {{categories.length}}</p>
        <ul class="categoryList">
            <li v-for="(category, index) in categories" :class="categories[index].color">
                <span>{{category.name}}</span>
                <select :id="`volpe-${index}`" @change="assignColor(category)" v-model="category.color">
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
    import { ref } from 'vue';
    import { computed } from 'vue';

    export default {
        name: 'App',
        setup () {
            const newCategory = ref('');
            const newTodo = ref('');
            const assignedCategory = ref('');
            const assignedColor = ref('');

            const todosData = JSON.parse(localStorage.getItem('todos')) || [];
            const categoriesData = JSON.parse(localStorage.getItem('categories')) || [];

            const todos = ref(todosData);
            const categories = ref(categoriesData);

            //const colori = ['Salmon', 'PaleVioletRed', 'Tomato', 'Khaki', 'DarkKhaki', 'Plum', 'LightGreen', 'MediumAquamarine', 'LightSteelBlue']

            const colors = () => {
                const r = document.querySelector(':root');
                const rs = getComputedStyle(r);
                const prefix = "--color--";

                const result = Object.values(rs).filter(el => el.startsWith(prefix))

                return result.map(el => el.replace(prefix, ''))
            }

            console.log(colors())

            let todo_eseguiti = computed(() => {
                return todos.value.filter(item => item.done).length
            })

            const computedColor = (category, todo) => {
                const foundCategory = categories.value.find(category => category.name === todo.category);

                return foundCategory ? foundCategory.color : undefined;
            };


            function addTodo () {
                if (newTodo.value) {
                    todos.value.push({
                        done: false,
                        content: newTodo.value,
                        category: ''
                    });
                    newTodo.value = '';
                }
                saveData();
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
                console.log(todos.value)
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
            
            return {
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
        background-color: whitesmoke;

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
 