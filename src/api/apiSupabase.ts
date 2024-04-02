import type { Database } from '../types/supabase';

import useAuthUser from "../composables/UseAuthUser"

const { supabase } = useAuthUser();
const { user } = useAuthUser();

export type TASK = Database["public"]["Tables"]["tasks"]["Row"]
export type CAT = Database["public"]["Tables"]["categories"]["Row"]


/**   
 * * Fetching either tasks or category table.
 * @param tableType => The type of table to fetch data from
 * @returns 
 */
export const fetchTable = async (tableType: string) => {
    //alert(tableType)
    try {
        const {data} = await supabase.from(tableType).select();

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
 * * Changes the category of a task.
 * @param S_table       => The type of table to fetch data from
 * @param S_id          => Table ID 
 * @param S_content     => Category name 
 */
export const updateCategory = async ( S_table: string, S_id: number | null, S_content: string | undefined | null) => { 
    await supabase.from(S_table).update({ category: S_content === 'Remove category' ? null : S_content }).eq('id', S_id)

    console.log('Content: ', S_content)
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
 * * Function that checks all the CSS rules in :root filtered by a string (prefix) that must be either '--icons--' or '--color--'
 * @param prefix
 */
export function detectCSSVariables(prefix) {
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
 * * Function for saving a Task or a Category.
 */
export async function S_saveData(S_table: string, S_content: TASK | CAT) {
    console.log("save", S_content)
    console.log(user.value)

    const insertObject: any = {name: S_content.name, user: user.value?.id}

    if ('icon' in S_content && S_content !== undefined) {
        insertObject.icon = S_content.icon
    }
    
    const { error } = await supabase.from(S_table).insert([insertObject]).select()

    S_table && S_table === "tasks" ?  await fetchTable('tasks') : await fetchTable('categories')
}
