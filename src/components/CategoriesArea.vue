<template>
    <section class="categoriesArea">
        <header>
            <form @submit.prevent="saveNewCategory()">
                <label for="createNewCat">New category</label>
                <input v-model="newCategoryName" name="categoryName" autocomplete="off" id="createNewCat">
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
    import type { CAT } from '../api/apiSupabase';

    import Popper from "vue3-popper";
    import { reactive, ref } from 'vue';
    import { removeItem, updateColor, updateIcon, detectCSSVariables, S_saveData } from '../api/apiSupabase';
    import useAuthUser from "../composables/UseAuthUser"

    const { supabase } = useAuthUser();
    const { user } = useAuthUser()

    const props = defineProps(['categories', 'tasks'])
    const emit = defineEmits(['categoryUpdated'])

    let editableIndex: Ref<number> = ref(-1)
    let categoryName: Ref<string>[] = reactive([])
    let newCategoryName: Ref<string> = ref('')
 
    /**
     * * Fxs for editing a single existing cat, one input at time. The second saves (update) the result and emits the event.
     */
    const editCategoryName = (index: number) => {
        editableIndex.value = editableIndex.value === index ? -1 : index;
        
        categoryName[index] = props.categories[index].name
    }
    const updateCategoryName = async (index: number) => {
        let oldCategory = props.categories !== null ? props.categories[index].name : ""
        let newCategory = categoryName[index]

        try {
            const { error: updateCategoryError } = await supabase
                .from('categories')
                .update({ name: newCategory })
                .eq('name', oldCategory);

            if (updateCategoryError) {
                console.error('Error updating category:', updateCategoryError);

                return
            }

            editableIndex.value = -1

            await emit('categoryUpdated');
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }

    /**
     * * Fx for saving a new category in the DB. It emits an event.
     */
    const saveNewCategory = async () => {
        let content: CAT = {
            name: newCategoryName.value,
            id: null,
            icon: 'icon-star',
            user: user?.value?.id ?? null
        }


        try {
            if(content.name === 'Remove category') {
                throw new Error("Sorry this name is reserved")
            }

            await S_saveData('categories', content)
            await emit('categoryUpdated');
        } catch(error) {
            alert(error.message)

            return
        } finally {
            newCategoryName.value = ''
        }

    }

</script>

