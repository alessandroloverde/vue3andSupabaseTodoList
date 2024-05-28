import type { CAT, TASK } from '../api/apiSupabase';
import useAuthUser from "../composables/UseAuthUser"

const { supabase } = useAuthUser();


/**
 * * Function that assign the category's color to a class for a todo.
 * @param todo 
 */
export const computedColor = (todo: TASK, categories: any): string | null | undefined => {
    const foundCategory: CAT = categories !== null
                        ? categories.find((category: { name: string }) => category.name === todo.category)
                        : categories
    
    return foundCategory?.color
};


/**
 * * Function to set a task as urgent
 * @param S_id 
 * @param todo 
*/
export const setUrgency = async (S_id: number | null , todo: TASK, tasks: TASK[]) => {
    todo.is_urgent = !todo.is_urgent;

    await supabase.from("tasks").update({ is_urgent: todo.is_urgent }).eq('id', S_id)

    sortByUrgencyAndCompletion(tasks)
}


/**
 * * Function for sorting according to completion and urgency
 * @param tasks 
 */
export const sortByUrgencyAndCompletion = (tasks: TASK[]) => {
    return tasks.sort((a, b) => {
      // Assuming `completed` is a boolean, invert its comparison to sort completed tasks last
      if (a.completed === b.completed) {
        // If completion is the same, sort by urgency (true comes before false)
        return (b.is_urgent === a.is_urgent) ? 0 : b.is_urgent ? 1 : -1;
      } else {
        // If one is completed and the other isn't, the uncompleted one should come first
        return a.completed ? 1 : -1;
      }
    })
  }