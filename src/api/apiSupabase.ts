import { createClient, type PostgrestError } from '@supabase/supabase-js';
import type { Ref } from 'vue';
import type { Database } from '../types/supabase';

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export type TASK = Database["public"]["Tables"]["tasks"]["Row"]
export type CAT = Database["public"]["Tables"]["categories"]["Row"]

// Save tasks
// Delete tasks
// Update tasks
// Save categories
// Delete categories
// Update categories


/**
 * * Fetch task or category
 */
export const fetchTasks = async (tasks: Ref<TASK[]|null>) => {
    try { 
        const { data, error }: { data: TASK[]|null, error: PostgrestError|null} = await supabase.from("tasks").select();

        if (error) { 
            console.log(error.message)

            return
        } else { tasks.value = data }     
    }
    catch (err) { 
        console.error(err)
     }
    
}
export const fetchCategories = async () => {
    try {
        const { data }: { data: CAT[]|null, error: PostgrestError|null } = await supabase.from("categories").select();
        return data
    }
    catch(err) {
        console.log(err)
        return null
    }   
}


/**
 * * Remove task or category
 */
export const removeItem = async (S_table: string , S_id: number, tasks: TASK[]|null, categories: CAT[]|null) => {
    const reference = S_table === "tasks" ? tasks : categories

    await supabase.from(S_table).delete().eq('id', S_id)

    reference ? reference.splice(reference.findIndex(el => el.id === S_id), 1) : []

    console.log(categories)
}


/**
 * * Save category
 */
export const saveCategory = async (name: CAT["name"] | null) => {
    await supabase.from('categories').insert({name}).select()

    const data = await fetchCategories()

    return data
}

