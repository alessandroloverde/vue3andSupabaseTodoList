import { createClient, type PostgrestError } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export type TASK = Database["public"]["Tables"]["tasks"]["Row"]
export type CAT = Database["public"]["Tables"]["categories"]["Row"]


/**
 * * Fetching either tasks or category table.
 * @param tableType => The type of table to fetch data from
 * @returns 
 */
export const fetchTable = async (tableType: string) => {
    alert('fetch')
    try {
        const {data} = await supabase.from(tableType).select();

/*         return data.sort((a, b) => {
            return (a.id > b.id) ? 0 : a.id ? 1 : -1
        }) */

        return data
    }
    catch(err) {
        console.error(err)
    }
}

/**
 * * Remove task or category.
 * @param S_table       => The type of table to fetch data from
 * @param S_id          => Table ID 
 * @param tasks         => Data Object
 * @param categories    => Data Object
 */
export const removeItem = async (S_table: string , S_id: number | null, tasks: TASK[]|null, categories: CAT[]|null) => {
    const reference = S_table === "tasks" ? tasks : categories

    await supabase.from(S_table).delete().eq('id', S_id)

    reference ? reference.splice(reference.findIndex(el => el.id === S_id), 1) : []
}

/**
 * * Changes the color of a category.
 * TODO $event is there just for testing: to be removed
 * @param colorClass    => The class that defines a color 
 * @param S_id          => Table ID 
 * @param $event        => Event target is the color's name
 */
export const updateColor = async (colorClass: string, S_id: number | null, $event: Event) => {
    try {
        await supabase.from("categories").update({ color: colorClass }).eq('id', S_id)
    }
    catch(err) {
        console.error(err)
    }
}

/**
 * * Changes the icon of a category.
 * @param iconClass    => The class that defines an icon 
 * @param S_id          => Table ID 
 */
export const updateIcon = async (iconClass: string, S_id: number | null, $event: Event) => {

    let topo: EventTarget = $event.target as EventTarget

    console.log(iconClass)
    console.log('event', topo)
    try {
        await supabase.from("categories").update({ icon: iconClass }).eq('id', S_id)
    }
    catch(err) {
        console.error(err)
    }
}

/**
 * * Changes the category of a task.
 * @param S_table       => The type of table to fetch data from
 * @param S_id          => Table ID 
 * @param S_content     => Category name 
 */
export const updateCategory = async ( S_table: string, S_id: number | null, S_content: string | undefined | null) => { 
    await supabase.from(S_table).update({ category: S_content }).eq('id', S_id)
}
