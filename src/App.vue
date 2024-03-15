<template>
    <AppHeader></AppHeader>
    <main>
        <div class="appContainer">
            <section class="authentication">
                <div>
                    <p>User Status: <strong>{{ authStatus ? "user logged in" : "user not logged" }}</strong></p>
                    <p>User Email: <strong>{{ myAuth?.user.email }}</strong></p>
                    <button v-if="authStatus" @click="logout()">Logout</button>
                </div>
                <form @submit.prevent="login()" v-if="!authStatus">
                    <div style="display: flex; margin: 20px; ">
                        <label for="LoginEmail">Email: </label>
                        <input type="email" v-model="myAuth.login.email.value" id="LoginEmail">
                        <label for="LoginPassword">Password: </label>
                        <input type="text" v-model="myAuth.login.password.value" id="LoginPassword">
                        <input type="submit">
                    </div>
                </form>
            </section>
            <CategoriesArea
                :categories="categories"
                :tasks="tasks"
                :supabase="supabase"
                @categoryUpdated="onFetch('categories')"
            ></CategoriesArea>
            <TasksArea
                :categories="categories"
                :tasks="tasks"
                :supabase="supabase"
                @taskUpdated="onFetch('tasks')"
            ></TasksArea>
            
        </div>
    </main>
</template>
<!-- <script lang="ts">
    export const tasks: Ref<TASK[] | null> = ref([]);
    export const categories: Ref<CAT[] | null> = ref([]);
</script> -->
<script lang="ts">
    export let myAuth = {
        login: {
            email: ref(''),
            password: ref(''),
            displayName: ref('')
        },
        register: {
            email: ref(''),
            password: ref(''),
            displayName: ref('')            
        },
        user: {
            id: ref(''),
            email: ref(''),
            role: ref(''),
        },
    }
</script>
<script setup lang="ts">

/*     type AuthField = {
        email: Ref<string> | Ref<null> | undefined;
        password?: Ref<string>  | Ref<null> | undefined;
        displayName?: Ref<string>  | Ref<null> | undefined;
        id?: Ref<string>  | Ref<null> | undefined;
        role?: Ref<string>  | Ref<null> | undefined;
    };

    type MyAuth = {
        login: AuthField;
        register: AuthField;
        user: AuthField;
    }; */


    import type { Ref } from 'vue';
    import type { TASK, CAT } from './api/apiSupabase';

    import { ref, reactive, onMounted, computed } from 'vue';
    import { createClient } from '@supabase/supabase-js';
    import { fetchTable, S_saveData } from './api/apiSupabase';

    import AppHeader from './components/AppHeader.vue';
    import CategoriesArea from './components/CategoriesArea.vue';
    import TasksArea from './components/TasksArea.vue';
   
    const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    const tasks: Ref<TASK[] | null> = ref([]);
    const categories: Ref<CAT[] | null> = ref([]);

    let authStatus: Ref<boolean> = ref(false)

    /**
     * * Auth - login
     */ 

    

    const login = async () => {  
        const { data, error } = await supabase.auth.signInWithPassword({
            email: myAuth.login.email.value,
            password: myAuth.login.password.value
        });

        if (error) {
            alert('login fallito')
            console.error('Login fallito. Error logging in:', error.message, data);       
        } else {
            !authStatus.value

/*             myAuth.user.id.value = data.user.id !== undefined  ? data.user.id : ''
            myAuth.user.email.value = data.user.email !== undefined ? data.user.email : ''
            myAuth.user.role.value = data.user.role !== undefined ? data.user.role : '' */

            onFetch('tasks')
            onFetch('categories')
        }
    }
    const register = async () => {   
        const {data, error } = await supabase.auth.signUp({
            email: myAuth.register.email.value,
            password: myAuth.register.password.value
        })

        if (error) console.error('Registrazione fallita. Error logging in:', error.message);
        else console.log('Successo. User registed:', data.user);
    }
    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        myAuth.login.email.value = ''
        myAuth.login.password.value = ''

        onFetch('tasks')
        onFetch('categories')

        if (error) throw error;
    }
    /* ----------------------------------------------------------------------------------------------------------- */


    /**
     * * Function for sorting according to completion and urgency
     * @param tasks 
     */
    const sortByUrgencyAndCompletion = (tasks) => {
        return tasks.value.sort((a, b) => {
            // Check for done tasks first
            if (a.completed === b.completed) {
            // If completion is the same, sort by urgency (false comes before true)
            return a.is_urgent - b.is_urgent;
            } else {
            // Completed tasks come first, regardless of urgency
            return a.completed ? 1 : -1;
            }
        })
    }


    // === Async functions ================================================================================================
    /**
     * * Helper function for fetching Tasks or Categories.
     * @param tableType 
     */
    const onFetch = async (tableType: string) => {
        const data: (TASK[] | CAT[]) = await fetchTable(tableType) as (TASK[] | CAT[]);

        tableType === "tasks" ? tasks.value = data as TASK[] : categories.value = data as CAT[]
    }


    /**
     * * These async funtions are triggered on component load
     */
    onMounted(async () => {
        await onFetch('categories')
        await onFetch('tasks')
        await sortByUrgencyAndCompletion(tasks)

        console.log('Load auth status', authStatus.value)

        const authListener = supabase.auth.onAuthStateChange((_event, session) => {
            alert('authChange')
            console.log(supabase.auth)
            console.log('event: ', _event, 'Session User: ', session?.user)

            myAuth.user.id.value = session?.user.id !== undefined ? session?.user.id : ''
            myAuth.user.email.value = session?.user.email !== undefined ? session?.user.email : ''
            myAuth.user.role.value = session?.user.role !== undefined ? session?.user.role : ''

            authStatus.value = session !== null;
        });

        // Unsubscribe on component unmount (optional)
/*         return () => {
            authListener.unsubscribe();
        }; */

    }) 
</script>

<style lang="scss">
    @import "./assets/_variables.scss";
    
    $textColor: $textWhite;
    $primaryColor: lightgrey;
    $secondTextColor: #1f2023;
    
    .taskName,
    .categoryName {
        display: flex;
        flex: 1 1 auto;
    }

    .categoryList > li {
        display: flex;
        justify-content: flex-end;
        
        @each $key, $name in $colors {
            &.#{$key} { 
                border-color: #{$name};

                button { 
                    background-color: #{$name};
                    border-color: darken($name, 20%);
                    color: darken($name, 40%);
                    margin: $standardMargin/4;

                    &:not(:only-child):last-child { margin-right: 0 }
                }
                span { 
                    color: #{$name};
                    margin-right: auto; 
                }
            }
        }
    } 

</style>
