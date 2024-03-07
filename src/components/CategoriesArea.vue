<template>
    <section class="categoriesArea">
        <header>
            <form @submit.prevent="addElement('categories')">
                <label>New category</label>
                <input v-model="categoryName" name="categoryName" autocomplete="off">
                <button>Add category</button>
            </form>
        </header>
        <section class="categoriesArea--info">
            <h4>Categories: <span>{{categories ? categories.length : 0}}</span></h4>
        </section>
        <section class="categoriesArea--main">
            <ul class="categoryList">
                <li v-for="(category, index) in categories" :key=category.id! :class="categories ? categories[index].color : null">
                    <div 
                        v-if="category.icon" 
                        :class="[category.icon, category.color]" 
                        class="selectedIcon"
                    ></div>
                    <div v-if="editableIndex === index">
                        <input
                            type="text"
                            v-model="categoryName[index]"                 
                            @blur="updateCategoryName(index)"
                            @keypress.enter="updateCategoryName(index)">
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
                        @click="editCategoryName(index)"
                    ></button>
                    <button
                        role="button"
                        aria-label="Remove category" 
                        class="btn--icn--icon-trash-o" 
                        @click="removeItem('categories', category.id, tasks, categories)"
                    ></button>
                </li>
            </ul>
        </section>
    </section>
</template>

<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { TASK, CAT } from '../api/apiSupabase';
    import Popper from "vue3-popper";
    import { reactive, ref, computed, watch, onMounted } from 'vue';
    import { removeItem, updateColor, updateIcon, detectCSSVariables, S_saveData, fetchTable } from '../api/apiSupabase';
    import {tasks, categories} from '../App.vue';

    const props = defineProps(['categories', 'tasks', 'supabase'])
    const emit = defineEmits(['categoryUpdated'])


    /**
     * ! v-model for new category
     */

    let editableIndex = ref(-1)
    let items = ref(categories)
    const inputCount = computed(() => items.value.length);


    let tempEditName = reactive(Array(props.categories.value?.length).fill(''))
    let categoryName: Ref<string>[] = reactive([]);
 
      
    const editCategoryName = (index: number) => {
        editableIndex.value = editableIndex.value === index ? -1 : index;
        
        categoryName[index] = props.categories[index].name
    }
    const updateCategoryName = async (index: number) => {
        let oldCategory = props.categories !== null ? props.categories[index].name : ""
        let newCategory = categoryName[index]

        try {
            const { error: updateCategoryError } = await props.supabase
                .from('categories')
                .update({ name: newCategory })
                .eq('name', oldCategory);

            if (updateCategoryError) {
                console.error('Error updating category:', updateCategoryError);

                return;
            }

            editableIndex.value = -1

            fetchTable('tasks')
            fetchTable('categories')

            emit('categoryUpdated');
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }



    /**
     * * Helper function for allowing the edit of a category or a task
     * @param index
     */
/*      const editCatName = (index: number) => {
        editingCat[index] = !editingCat[index]
      
        tempEditName[index] = props.categories !== null ? props.categories[index].name : ""
    } */



    /**
     * * Function for adding a Task or a Category.
     * @param S_table 
     */
     const addElement = async (S_table: string) => {
        const newCategoryData: CAT = {
            name: categoryName ?? '',
            id: null,
            //user: myAuth?.userID?.value ? myAuth.userID.value : null,
        }

        if (categoryName) {
            props.categories.value?.push(newCategoryData);

            categoryName = '';

            S_saveData(S_table, newCategoryData);
        } 
    }


    const updateCatName = async ( index: number, oldCatName: string, ) => {
        let newCategoryName = tempEditName[index]

        try {
            const { error: updateCategoryError } = await props.supabase
                .from('categories')
                .update({ name: newCategoryName })
                .eq('name', oldCatName);

            if (updateCategoryError) {
                console.error('Error updating category:', updateCategoryError);

                return;
            }

            tempEditName[index] = categories[index].name
            editingCat[index] = false

            fetchTable('tasks')
            fetchTable('categories')
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }
</script>

