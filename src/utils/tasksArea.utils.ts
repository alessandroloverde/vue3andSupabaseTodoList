import type { CAT, TASK } from '../api/apiSupabase';

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